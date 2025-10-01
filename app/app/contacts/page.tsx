"use client";
import React, {useContext, useEffect, useState} from "react";
import {DependencyContext} from "@/infrastructure/dependency.context";
import {ContactOverview} from "@/domain/contact/entity/ContactOverview";
import OverviewCard from "@/components/common/OverviewCard";
import Loader from "@/components/common/loader/Loader";
import {useRouter, useSearchParams} from "next/navigation";
import ButtonAdd from "@/components/common/ButtonAdd";
import FormContact from "@/scenes/contact/FormContact";
import SearchBar from "@/components/common/SearchBar";

const ContactHome: React.FC = () => {
    const { contactPort } = useContext(DependencyContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [contacts, setContacts] = useState<ContactOverview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [create, setCreate] = useState<string | null>(searchParams.get("create"));
    const [isFormDisplayed, setIsFormDisplayed] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        setTrigger(false);
        contactPort.getAllContacts()
            .then(data => {
                setContacts(data);
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
            });
            if (create){
                setIsFormDisplayed(true);
            }
    }, [trigger]);

    const handleDelete = (id: number) => {
        setIsLoading(true);
        contactPort.deleteContact(id)
            .then((message) => {
                return contactPort.getAllContacts();
            })
            .then((data => {
                setContacts(data);
                setIsLoading(false);
            }));
    }

    if (isLoading) {
        return <Loader/>
    }
    else if(contacts.length == 0) {
        return <h1 className="text-3xl uppercase font-bold mt-5 mb-5">Vous n'avez aucun contact</h1>
    }
    return (
        <div className="font-sans bg-gray-50 text-gray-600 my-4">
            <main className="flex flex-col p-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mt-10 mb-10">
                        Voici la liste de vos contacts !
                    </h1>
                    <div className="flex w-8/12 mb-10 ">
                        <ButtonAdd
                            title="Créer votre contact"
                            onClick={() => {
                                router.replace("/contacts");
                                setIsFormDisplayed(true);
                            }}
                        />
                        <SearchBar
                            onSearch={(query) => {
                                setContacts(contacts.filter(c => c.lastName.toLowerCase().includes(query.toLowerCase()) || c.firstName.toLowerCase().includes(query.toLowerCase())))
                            }}
                        />
                    </div>
                </div>
                    <div className="flex justify-center ">
                        <div className="flex justify-center w-10/12 flex-wrap">
                            {contacts.length > 0 ?
                                contacts.map(contact => {
                                    return (
                                        <OverviewCard
                                            key={contact.idContact}
                                            id={contact.idContact}
                                            path={`/contacts/${contact.idContact}`}
                                            imageUrl={'/contact_icon.png'}
                                            name={contact.firstName + " " + contact.lastName}
                                            handleDelete={() => handleDelete(contact.idContact)}
                                            handleUpdate={() => {
                                                router.push(`/contacts/${contact.idContact}?update=true`)
                                            }}
                                            desc={contact.email}
                                        />
                                    )
                                })
                                :null
                            }
                        </div>
                    </div>
                {
                    isFormDisplayed &&
                    <FormContact
                        onClose={() => {
                            setIsFormDisplayed(false);
                        }}
                        handleSumitContact={() => {
                            router.replace("/contacts");
                            setCreate(null);
                            setTrigger(true);
                        }}
                    />
                }
            </main>
        </div>
    )
}

export default ContactHome;
