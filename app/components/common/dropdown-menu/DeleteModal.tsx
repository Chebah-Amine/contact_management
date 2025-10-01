import React from 'react';

type DeleteModalProps = {
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm, title}) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
                <div className="flex flex-col items-center m-4">
                    <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                    <p className="text-sm text-gray-500">{title}</p>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-6 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-6 rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
