"use client";
import React, {useContext, useEffect, useState} from "react";
import { DetailCardContainer, DetailCardSection, ItemSection, LinkCard } from "@/components/common/detail-item/DetailCardContainer";
import {Contact} from "@/domain/contact/entity/contact-card/detail/Contact";
import {DependencyContext} from "@/infrastructure/dependency.context";
import Loader from "@/components/common/loader/Loader";
import {useRouter, useSearchParams} from "next/navigation";
import FormContact from "@/scenes/contact/FormContact";

type ContactDetailProps = {
    params: {
        param: number;
    };

};

const ContactDetail: React.FC<ContactDetailProps> = ({ params }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { contactPort } = useContext(DependencyContext);
    const [contact, setContact] = useState<Contact | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState<string|null>(searchParams.get("update"))
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [triggerContact, setTriggerContact] = useState<boolean>(false);
    const idContact = params.param;

    useEffect(() => {
        if (!isNaN(idContact)){
            setTriggerContact(false);
            contactPort.getContactById(idContact)
                .then(data => {
                    setContact(data);
                    setIsLoading(false);
                    if (isUpdate != null && isUpdate) {
                        setIsFormOpen(true);
                    }
                })
                .catch (e =>  {
                    console.log(e);
                    setIsLoading(false);
                })
        }
        else {
            setIsLoading(false);
        }
    }, [triggerContact])

    const handleDelete = (id: number) => {
        setIsLoading(true);
        contactPort.deleteContact(id)
            .then((message) => {
                router.push("/contacts");
            })
            .catch(e => {
                //mettre une alerte
                console.log("erreur lors de la suppression");
                setIsLoading(false);
            })
    }

    if (isLoading) {
        return <Loader/>
    }
    else if (contact == null)
    {
        return (
            <h1 className="text-3xl uppercase font-bold mt-5 mb-5">404 Aucun contact avec l'id {idContact}</h1>
        )
    }
    return (
        <DetailCardContainer
            title={"Fiche Contact #" + contact.idContact}
            handleDelete={() => handleDelete(idContact)}
            handleUpdate={() => {setIsFormOpen(true)}}
        >
            <DetailCardSection title="Informations générales">
                <ItemSection title="Nom" value={contact.lastName}/>
                <ItemSection title="Prénom" value={contact.firstName}/>
                <ItemSection title="Email" value={contact.email}/>
            </DetailCardSection>

            <DetailCardSection title="Adresse">
                {contact.address &&
                    <>
                        <ItemSection title="Pays" value={contact.address.country}/>
                        <ItemSection title="Code postal" value={contact.address.zip}/>
                        <ItemSection title="Ville" value={contact.address.city}/>
                        <ItemSection title="Rue" value={contact.address.street}/>
                    </>
                }
            </DetailCardSection>
            <DetailCardSection
                title={`Téléphones (${contact.phoneNumbers ? contact.phoneNumbers.length : 0})`}
            >
                    {
                        contact.phoneNumbers &&
                            contact.phoneNumbers.map(tel => {
                                return (
                                    <ItemSection
                                        key={tel.idPhoneNumber}
                                        title={tel.phoneKind}
                                        value={tel.phoneNumber}
                                    />
                                )
                            })
                    }
            </DetailCardSection>
            <DetailCardSection
                title={`Mes groupes (${contact.groups ? contact.groups.length : 0})`}
                direction="raw"
            >
                    {
                        contact.groups &&
                            contact.groups.map(group => {
                                return (
                                    <LinkCard
                                        key={group.idContactGroup}
                                        title={"Groupe #" + group.idContactGroup}
                                        value={group.name}
                                        path={"/groups/" + group.idContactGroup}
                                    />
                                )
                            })
                    }
            </DetailCardSection>
            {
                isFormOpen &&
                <FormContact
                    contactProps={contact}
                    onClose={() => {
                        setIsFormOpen(false);
                    }}
                    handleSumitContact={() => {
                        router.replace(`${idContact}`)
                        setIsUpdate(null);
                        setTriggerContact(true);
                    }}
                />
            }
        </DetailCardContainer>
    );
};


export default ContactDetail;