import React from "react";

type ButtonAddProps = {
    title: string;
    onClick: () => void;
}
const ButtonAdd: React.FC<ButtonAddProps> = ({title, onClick}) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white p-5 mr-4 border-2 border-dashed rounded-lg hover:border-solid hover:bg-blue-500 transition duration-300 ease-in-out cursor-pointer"
            onClick={onClick}
        >
            <span className="text-xl font-bold text-blue-700 hover:text-white">{title}</span>
            <div className="flex items-center mt-2">
                <img src="/plus_dotted_icon.svg" alt="plus dotted icon" className="w-5 h-5 mr-2" />
                <span className="text-lg font-medium text-blue-700 hover:text-white">Ajouter</span>
            </div>
        </div>
    )
}

export default ButtonAdd;