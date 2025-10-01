import React from "react";
import {UseFormRegister} from "react-hook-form";
import {FormInputField, FormSection} from "@/components/common/form/FormContainer";

type GeneralInformationFormProps = {
    register: UseFormRegister<any>;
    messageError?: {
        lastname?: string,
        firstname?: string,
        email?: string,
    }
}
const GeneralInformationForm: React.FC<GeneralInformationFormProps> = ({register, messageError}) => {
  return (
      <FormSection title="Informations générales">
          <div className="flex">
              <FormInputField
                  label="Nom*"
                  name="contact.lastName"
                  register={register}
                  messageError={messageError?.lastname}
                  validationRules={{ required: "Le nom est obligatoire" }}
              />
              <FormInputField
                  label="Prénom*"
                  name="contact.firstName"
                  register={register}
                  messageError={messageError?.firstname}
                  validationRules={{ required: "Le prénom est obligatoire" }}
              />
          </div>
          <FormInputField
              label="Email*"
              name="contact.email"
              register={register}
              messageError={messageError?.email}
              validationRules={{ required: "L'email est obligatoire" }}
          />
      </FormSection>
  )
}

export default GeneralInformationForm;