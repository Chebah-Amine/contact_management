import React from "react";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {FormInputField, FormSection} from "@/components/common/form/FormContainer";

type AddressFormProps = {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}
const AddressForm: React.FC<AddressFormProps> = ({register, errors}) => {
    return (
        <FormSection title="Adresse">
            <div className="flex">
                <FormInputField
                    label="Rue"
                    name="contact.address.street"
                    register={register}
                />
                <FormInputField
                    label="Ville"
                    name="contact.address.city"
                    register={register}

                />
            </div>
            <FormInputField
                label="Code postal"
                name="contact.address.zip"
                register={register}
            />
            <FormInputField
                label="Pays"
                name="contact.address.country"
                register={register}
            />
        </FormSection>
    )
}

export default AddressForm;