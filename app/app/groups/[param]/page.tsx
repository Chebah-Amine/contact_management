"use client";
import React, {useContext, useEffect, useState} from "react";
import {
    DetailCardContainer,
    DetailCardSection,
    ItemSection,
    LinkCard
} from "@/components/common/detail-item/DetailCardContainer";
import {DependencyContext} from "@/infrastructure/dependency.context";
import Loader from "@/components/common/loader/Loader";
import {Group} from "@/domain/group/entity/group-card/detail/Group";
import {useRouter, useSearchParams} from "next/navigation";
import FormGroup from "@/scenes/group/FormGroup";

type ContactDetailProps = {
    params: {
        param: number;
    };
};

const ContactDetail: React.FC<ContactDetailProps> = ({ params }) => {
    const { groupPort } = useContext(DependencyContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [group, setGroup] = useState<Group | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState<string|null>(searchParams.get("update"))
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [triggerGroup, setTriggerGroup] = useState<boolean>(false);
    const idGroup = params.param;

    useEffect(() => {
        if (!isNaN(idGroup)){
            setTriggerGroup(false);
            groupPort.getGroupById(idGroup)
                .then(data => {
                    setGroup(data);
                    setIsLoading(false);
                    if (isUpdate != null && isUpdate) {
                        setIsFormOpen(true);
                    }
                })
                .catch (e =>  {
                    setIsLoading(false);
                })
        }
        else {
            setIsLoading(false);
        }
    }, [triggerGroup])

    const handleDelete = (id: number) => {
        setIsLoading(true);
        groupPort.deleteGroup(idGroup)
            .then((message) => {
                router.push("/groups");
            })
            .catch(e => {
                console.log("erreur lors de la suppression du group")
                setIsLoading(false);
            })
    }

    if (isLoading) {
        return <Loader/>
    }
    else if (group == null)
    {
        return (
            <h1 className="text-3xl uppercase font-bold mt-5 mb-5">404 Aucun group avec l'id {idGroup}</h1>
        )
    }

    return (
        <DetailCardContainer
            title={"Fiche Groupe #" + group.idGroup}
            handleDelete={() => handleDelete(idGroup)}
            handleUpdate={() => setIsFormOpen(true)}
        >
            <DetailCardSection title="Informations générales">
                <ItemSection title="Nom" value={group.name}/>
            </DetailCardSection>
            <DetailCardSection
                title={`Mes contactes (${group.contacts ? group.contacts.length : 0})`}
                direction="raw"
            >
                {
                    group.contacts &&
                    group.contacts.map(contact => {
                        return (
                            <LinkCard
                                key={contact.idContact}
                                title={"Contact #" + contact.idContact}
                                value={contact.firstname + " " + contact.lastname}
                                path={"/contacts/" + contact.idContact}
                            />
                        )
                    })
                }
            </DetailCardSection>
            {
                isFormOpen &&
                <FormGroup
                    groupProps={group}
                    onClose={() => {
                        setIsFormOpen(false);
                    }}
                    handleSumitGroup={() => {
                        router.replace(`${idGroup}`)
                        setIsUpdate(null);
                        setTriggerGroup(true);
                    }}
                />
            }
        </DetailCardContainer>
    );
};


export default ContactDetail;