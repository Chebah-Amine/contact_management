"use client";
import React, {useContext, useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {FormContainer} from "@/components/common/form/FormContainer";
import {Contact} from "@/domain/contact/entity/contact-card/detail/Contact";
import {PhoneNumber} from "@/domain/contact/entity/contact-card/PhoneNumber";
import {ContactGroup} from "@/domain/contact/entity/contact-card/ContactGroup";
import {DependencyContext} from "@/infrastructure/dependency.context";
import GeneralInformationForm from "@/scenes/contact/step-1/GeneralInformationForm";
import AddressForm from "@/scenes/contact/step-1/AddressForm";
import PhoneNumberForm from "@/scenes/contact/step-1/PhoneNumberForm";
import GroupListForm from "@/scenes/contact/step-2/GroupListForm";
import {toCreteContact, toUpdateContact} from "@/domain/contact/mapper/MapperContact";
import {ContactUpdate} from "@/domain/contact/entity/contact-card/update/ContactUpdate";
import Loader from "@/components/common/loader/Loader";
import {ContactCreate} from "@/domain/contact/entity/contact-card/create/ContactCreate";

type FormContactProps = {
    onClose: () => void;
    contactProps?: Contact;
    handleSumitContact: () => void;
}

type Inputs = {
    contact: Contact | undefined;
}

const FormContact: React.FC<FormContactProps> = ({onClose, contactProps, handleSumitContact}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { groupPort, contactPort } = useContext(DependencyContext);
    const [allgroups, setAllgroups] = useState<ContactGroup[]>([]);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const {
        register,
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            contact: contactProps
        }
    });

    useEffect(() => {
        groupPort.getAllGroups()
            .then(data => {
                let array: ContactGroup[] = data.map(group => {
                    return {
                        idContactGroup: group.id,
                        name: group.name
                    }
                });
                setAllgroups(array.filter(group =>
                    !groups.some(g => g.idContactGroup === group.idContactGroup)
                ));
            })
    }, [])

    const { fields: phones, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: 'contact.phoneNumbers',
    });

    const { fields: groups, append: appendGroup, remove: removeGroup } = useFieldArray({
        control,
        name: 'contact.groups',
    });
    const handleRemoveGroup = (id: number) => {
        let index = groups.findIndex(group => group.idContactGroup === id);
        removeGroup(index);
        let groupRemoved: ContactGroup = groups.find(value => value.idContactGroup === id) as ContactGroup;
        setAllgroups([...allgroups, groupRemoved])
    }
    const handleAddGroup = (selectedGroup: ContactGroup) => {
        appendGroup(selectedGroup);
        let newAllGroups: ContactGroup[] = allgroups.filter(group => !(group.idContactGroup === selectedGroup.idContactGroup) )
        setAllgroups(newAllGroups);
    }
    const handleNext = async () => {
        const result = await trigger(['contact.firstName', 'contact.lastName', 'contact.email', 'contact.phoneNumbers'], { shouldFocus: true });
        if(result) {
            setCurrentPage(2);
        }
    };
    const onSubmit = (data: Inputs) => {
        if (contactProps != undefined){
            setIsLoader(true);
            let contactUpdate: ContactUpdate = toUpdateContact(data.contact as Contact);
            contactPort.updateContact(contactUpdate)
                .then(message => {
                    setIsLoader(false);
                    onClose();
                    handleSumitContact();
                })
                .catch(e => {
                    setIsLoader(false);
                })
        }
        else {
            setIsLoader(true);
            let contactCreate: ContactCreate = toCreteContact(data.contact as Contact);
            contactPort.createContact(contactCreate)
                .then(message => {
                    setIsLoader(false);
                    onClose();
                    handleSumitContact();
                })
                .catch(e => {
                    setIsLoader(false);
                })
        }

        //onClose(); // Fermez le formulaire après la soumission
    };

    let title = "Modifier le contact";
    let submitTitle = "Mettre à jour"
    if (contactProps == undefined){
        title = "Créer un nouveau contact";
        submitTitle = "Créer contact";
    }
    let content = null;
    if (currentPage == 1) {
        content = (
            <>
                <GeneralInformationForm
                    register={register}
                    messageError={
                        {
                         lastname: errors?.contact?.lastName?.message,
                         firstname: errors?.contact?.firstName?.message,
                         email: errors?.contact?.email?.message
                        }
                    }
                />
                <AddressForm
                    register={register}
                    errors={errors}
                />
                <PhoneNumberForm
                    phones={phones}
                    onPhoneRemove={(index: number) => removePhone(index)}
                    onPhoneAppend={() => appendPhone({ phoneKind: "", phoneNumber: "", idPhoneNumber: null } as PhoneNumber)}
                    register={register}
                    messageError={
                        phones.map((phone, index) => {
                            return {
                                phoneKind: errors?.contact?.phoneNumbers?.[index]?.phoneKind?.message,
                                phoneNumber: errors?.contact?.phoneNumbers?.[index]?.phoneNumber?.message
                            }
                        })
                    }
                />
            </>
        )
    }
    else {
        content = (
            <GroupListForm
                groups={groups}
                allGroups={allgroups}
                onGroupRemove={(id) => {handleRemoveGroup(id)}}
                onGroupAppend={(group) => {handleAddGroup(group)}}
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

export default FormContact;