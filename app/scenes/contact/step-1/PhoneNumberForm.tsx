import React from "react";
import {UseFormRegister} from "react-hook-form";
import {FormInputField, FormSection} from "@/components/common/form/FormContainer";
import {PhoneNumber} from "@/domain/contact/entity/contact-card/PhoneNumber";

type PhoneNumberFormProps = {
    phones: PhoneNumber[];
    onPhoneRemove: (index: number) => void;
    onPhoneAppend: () => void;
    register: UseFormRegister<any>;
    messageError?: {
        phoneKind?: string,
        phoneNumber?: string,
    }[]
}
const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({phones, onPhoneRemove, onPhoneAppend, register, messageError}) => {
    return (
        <FormSection
            title="Téléphones"
        >
            <div className="flex w-1/2 mt-4 ml-4">
                <button
                    type="button"
                    onClick={onPhoneAppend}
                    className="flex items-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    <p className="mr-3 text-bold">Add</p>
                    <img src={`/plus-icon.png`} alt={`plus icon`} className="w-5 h-5"/>
                </button>
            </div>

            {phones.map((phone, index) => (
                <div key={index} className="flex">
                    <FormInputField
                        label="Type"
                        name={`contact.phoneNumbers.${index}.phoneKind`}
                        register={register}
                        messageError={messageError?.[index]?.phoneKind}
                        validationRules={{ required: "Le type pour un numéro est obligatoire" }}
                    />
                    <FormInputField
                        label="Numéro"
                        name={`contact.phoneNumbers.${index}.phoneNumber`}
                        register={register}
                        messageError={messageError?.[index]?.phoneNumber}
                        validationRules={{ required: "Le numéro est obligatoire" }}
                    />
                    <button type="button" onClick={() => onPhoneRemove(index)}>
                        <img src="/red-delete-icon.svg" alt="delete icon svg" className="w-5 h-5 mt-5 ml-4 mr-4"/>
                    </button>
                </div>
            ))}
        </FormSection>
    )
}

export default PhoneNumberForm;