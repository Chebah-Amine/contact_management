"use client";
import React, {useContext, useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {FormContainer} from "@/components/common/form/FormContainer";
import {DependencyContext} from "@/infrastructure/dependency.context";
import Loader from "@/components/common/loader/Loader";
import {GroupContact} from "@/domain/group/entity/group-card/detail/GroupContact";
import {Group} from "@/domain/group/entity/group-card/detail/Group";
import {GroupUpdate} from "@/domain/group/entity/group-card/update/GroupUpdate";
import {toGroupCreate, toGroupUpdate} from "@/domain/group/mapper/MapperGroup";
import GeneralInformationGroupForm from "@/scenes/group/step-1/GeneralInformationGroupForm";
import ContactListForm from "@/scenes/group/step-2/ContactListForm";

type FormGroupProps = {
    onClose: () => void;
    groupProps?: Group;
    handleSumitGroup: () => void;
}

type Inputs = {
    group: Group | undefined;
}

const FormGroup: React.FC<FormGroupProps> = ({onClose, groupProps, handleSumitGroup}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { groupPort, contactPort } = useContext(DependencyContext);
    const [allContacts, setAllContacts] = useState<GroupContact[]>([]);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const {
        register,
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            group: groupProps
        }
    });

    useEffect(() => {
        contactPort.getAllContacts()
            .then(data => {
                let array: GroupContact[] = data.map(contact => {
                    return {
                        idContact: contact.idContact,
                        firstname: contact.firstName,
                        lastname: contact.lastName
                    }
                });
                setAllContacts(array.filter(contact =>
                    !contacts.some(c => c.idContact === contact.idContact)
                ));
            })
    }, [])


    const { fields: contacts, append: appendContact, remove: removeContact } = useFieldArray({
        control,
        name: 'group.contacts',
    });
    const handleRemoveContact = (id: number) => {
        let index = contacts.findIndex(contact => contact.idContact === id);
        removeContact(index);
        let contactRemoved: GroupContact = contacts.find(value => value.idContact === id) as GroupContact;
        setAllContacts([...allContacts, contactRemoved])
    }
    const handleAddContact = (selectedContact: GroupContact) => {
        appendContact(selectedContact);
        let newAllContacts: GroupContact[] = allContacts.filter(contact => !(contact.idContact === selectedContact.idContact) )
        setAllContacts(newAllContacts);
    }
    const handleNext = async () => {
        const result = await trigger(['group.name'], { shouldFocus: true });
        if(result) {
            setCurrentPage(2);
        }
    };
    const onSubmit = (data: Inputs) => {
        if (groupProps != undefined){
            setIsLoader(true);
            let groupUpdate: GroupUpdate = toGroupUpdate(data.group as Group);
            groupPort.updateGroup(groupUpdate)
                .then(message => {
                    setIsLoader(false);
                    onClose();
                    handleSumitGroup();
                })
                .catch(e => {
                    setIsLoader(false);
                })
        }
        else {
            setIsLoader(true);
            let groupCreate = toGroupCreate(data.group as Group);
            groupPort.createGroup(groupCreate)
                .then(message => {
                    setIsLoader(false);
                    onClose();
                    handleSumitGroup();
                })
                .catch(e => {
                    setIsLoader(false);
                })
        }

        //onClose(); // Fermez le formulaire après la soumission
    };

    let title = "Modifier le groupe";
    let submitTitle = "Mettre à jour"
    if (groupProps == undefined){
        title = "Créer un nouveau groupe";
        submitTitle = "Créer groupe"
    }
    let content = null;
    if (currentPage == 1) {
        content = (
            <>
                <GeneralInformationGroupForm
                    register={register}
                    messageError={
                        {
                            name: errors?.group?.name?.message
                        }
                    }
                />
            </>
        )
    }
    else {
        content = (
            <ContactListForm
                contacts={contacts}
                allContacts={allContacts}
                onContactRemove={(id) => handleRemoveContact(id)}
                onContactAppend={(contact) => handleAddContact(contact)}
                register={register}
            />
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer
                title={title}
                onClose={onClose}
            >
                {isLoader? <Loader/> :
                    <>
                        {content}
                        <div className="flex justify-between mt-4">
                            {currentPage == 1 ? (
                                <button
                                    className="next-button"
                                    type="button"
                                    onClick={handleNext}
                                >
                                    Page suivante
                                </button>
                            ) : (
                                <button
                                    className="prev-button"
                                    type="button"
                                    onClick={() => setCurrentPage(1)}
                                >
                                    Page Précédente
                                </button>
                            )}
                            <button
                                className="submit-button"
                                type="submit"
                            >
                                {submitTitle}
                            </button>
                        </div>
                    </>
                }

            </FormContainer>
        </form>
    )
}

export default FormGroup;