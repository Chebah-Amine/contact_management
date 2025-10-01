import React, {ReactNode} from "react";
import "./Form.scss";
import {UseFormRegister} from 'react-hook-form';


type FormContainerProps = {
    title: string;
    onClose: () => void;
    children: ReactNode;

}

export const FormContainer: React.FC<FormContainerProps> = ({title, onClose, children}) => {
  return (
      <div className="modal">
          <div className="modal-content">
              <div className="modal-header">
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <button type="button" onClick={onClose} className="modal-close-button">&times;</button>
              </div>
              <div className="modal-body">
                  {children}
              </div>
          </div>
      </div>
  )
}

type FormSectionProps = {
    title: string;
    children: ReactNode;
    direction?: boolean
}
export const FormSection: React.FC<FormSectionProps> = ({title, children, direction}) => {
    let style = "flex flex-col mt-4 ml-4";
    if (direction) {
        style = "flex mt-4 ml-4";
    }
    return (
        <div className="flex flex-col m-2 w-full p-4">
            <h1 className="text-xl font-semi-bold text-blue-700">{title}</h1>
            <div className={style}>
                {children}
            </div>
        </div>
    )
}

type FormInputFieldProps = {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    messageError?: string | undefined;
    validationRules?: object;
};

export const FormInputField: React.FC<FormInputFieldProps> = ({ label, name, register, messageError, validationRules }) => {
    return (
        <div className="input-group">
            <label htmlFor={name} className="input-label text-sm">{label}</label>
            <input
                type="text"
                id={name}
                {...register(name, validationRules)} // Enregistre l'input auprès de react-hook-form
                className={`input-field ${messageError? 'input-field-error' : ''} shadow-lg`} // Ajoutez une classe pour le style d'erreur si nécessaire
            />
            {messageError && <p className="error-message">{messageError}</p>} {/* Affiche le message d'erreur si présent */}
        </div>
    );
};

type FormListProps = {
    title: string;
    children: ReactNode;
}
export const FormList: React.FC<FormListProps> = ({ title, children }) => {
    return (
        <div className="list-group p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-600 mb-3">{title}</h3>
            <div className=" space-y-2">
                {children}
            </div>
        </div>
    );
}


type FormListFieldProps = {
    label: string;
    value: string;
    name: string
    onClick: () => void;
    register?: UseFormRegister<any>;
    event: "plus"|"minus";
}

export const FormListField: React.FC<FormListFieldProps> = ({ label, value, name, register, onClick, event }) => {
    // Gestionnaire de clic qui empêche la propagation de l'événement à des éléments parents
    let content = (
        <>
            <label htmlFor={name} className="text-xs font-medium tracking-wide text-gray-400">
                {label}
            </label>
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">{value}</span>
                <button type="button" onClick={onClick} className="p-2 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out">
                    <img src={`/${event}-icon.png`} alt={`${event} icon`} className="w-5 h-5"/>
                </button>
            </div>
        </>
    )
    if (register) {
        return (
            <div id={name} className="list-item p-4 border-b border-gray-300 hover:bg-gray-100" {...register(name)}>
                {content}
            </div>
        )
    }
    return (
        <div id={name} className="list-item p-4 border-b border-gray-300 hover:bg-gray-100">
            {content}
        </div>
    );
};


