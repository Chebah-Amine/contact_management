import React from "react";
import {UseFormRegister} from "react-hook-form";
import {FormList, FormListField, FormSection} from "@/components/common/form/FormContainer";
import {GroupContact} from "@/domain/group/entity/group-card/detail/GroupContact";

type ContactListFormProps = {
    contacts: GroupContact[];
    allContacts: GroupContact[];
    onContactRemove: (id: number) => void;
    onContactAppend: (contact: GroupContact) => void;
    register: UseFormRegister<any>;
}
const ContactListForm: React.FC<ContactListFormProps> = ({contacts, allContacts, onContactRemove, onContactAppend, register}) => {
    const sort = (a: string, b: string) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
    return (
        <FormSection title="Mes contacts"
                     direction={true}
        >
            <FormList
                title={`Liste de tous les contacts (${allContacts.length})`}
            >
                {[...allContacts].sort((a, b) => sort(a.lastname, b.lastname) ).map((contact, index) =>
                    (
                        <FormListField
                            key={contact.idContact}
                            label={`Contact #${contact.idContact}`}
                            value={contact.lastname + " " + contact.firstname}
                            name={`group.contacts.${index}.idContact`}
                            onClick={() => {onContactAppend(contact)}}
                            event="plus"
                        />
                    ))
                }
            </FormList>
            <FormList
                title={`Liste des contacts sélectionnés (${contacts.length})`}
            >
                {[...contacts].sort((a, b) => sort(a.lastname, b.lastname) ).map((contact, index) =>
                    (
                        <FormListField
                            key={contact.idContact}
                            label={`Contact #${contact.idContact}`}
                            value={contact.firstname + " " + contact.lastname}
                            name={`group.contacts.${index}.idContact`}
                            onClick={() => {onContactRemove(contact.idContact)}}
                            register={register}
                            event="minus"
                        />
                    ))
                }
            </FormList>
        </FormSection>
    )
}

export default ContactListForm;