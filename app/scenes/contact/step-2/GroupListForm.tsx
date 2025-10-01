import React from "react";
import {UseFormRegister} from "react-hook-form";
import {FormList, FormListField, FormSection} from "@/components/common/form/FormContainer";
import {ContactGroup} from "@/domain/contact/entity/contact-card/ContactGroup";

type GroupListFormProps = {
    groups: ContactGroup[];
    allGroups: ContactGroup[];
    onGroupRemove: (id: number) => void;
    onGroupAppend: (group: ContactGroup) => void;
    register: UseFormRegister<any>;
}
const GroupListForm: React.FC<GroupListFormProps> = ({groups, allGroups, onGroupRemove, onGroupAppend, register}) => {
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
        <FormSection title="Mes groupes"
                     direction={true}
        >
            <FormList
                title={`Liste de tous les groupes (${allGroups.length})`}
            >
                {[...allGroups].sort((a, b) => sort(a.name, b.name) ).map((group, index) =>
                    (
                        <FormListField
                            key={group.idContactGroup}
                            label={`Group #${group.idContactGroup}`}
                            value={group.name}
                            name={`contact.groups.${index}.idContactGroup`}
                            onClick={() => {onGroupAppend(group)}}
                            event="plus"
                        />
                    ))
                }
            </FormList>
            <FormList
                title={`Liste des groupes sélectionnés (${groups.length})`}
            >
                {[...groups].sort((a, b) => sort(a.name, b.name) ).map((group, index) =>
                    (
                        <FormListField
                            key={group.idContactGroup}
                            label={`Group #${group.idContactGroup}`}
                            value={group.name}
                            name={`contact.groups.${index}.idContactGroup`}
                            onClick={() => {onGroupRemove(group.idContactGroup)}}
                            register={register}
                            event="minus"
                        />
                    ))
                }
            </FormList>
        </FormSection>
    )
}

export default GroupListForm;