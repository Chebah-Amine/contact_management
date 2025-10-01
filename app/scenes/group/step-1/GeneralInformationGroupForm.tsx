import React from "react";
import {FormInputField, FormSection} from "@/components/common/form/FormContainer";
import {UseFormRegister} from "react-hook-form";

type GenInfoGroupFormProps = {
    register: UseFormRegister<any>;
    messageError?: {
        name?: string
    }
}
const GeneralInformationGroupForm: React.FC<GenInfoGroupFormProps> = ({register, messageError}) => {
    return (
        <FormSection title="Informations générales">
            <FormInputField
                label="Nom*"
                name="group.name"
                register={register}
                messageError={messageError?.name}
                validationRules={{ required: "Le nom du groupe est obligatoire" }}
            />
        </FormSection>
    )
}

export default GeneralInformationGroupForm;