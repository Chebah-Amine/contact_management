"use client";
import React, {useState} from 'react';
import DeleteModal from "@/components/common/dropdown-menu/DeleteModal";

type DropdownMenuProps = {
    handleConfirmDelete: () => void;
    handleUpdate: () => void;
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({ handleConfirmDelete, handleUpdate }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <div className="relative flex justify-end px-4 pt-4">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
            >
                <img src="/three-dots.svg" alt="three dot svg" className="w-5 h-5"/>
            </button>
            {dropdownOpen &&
                <div className="flex absolute right-3 mt-10">
                    <div className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2">
                            <li className="flex items-center justify-between hover:bg-gray-100">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                    onClick={() => {handleUpdate(); setDropdownOpen(false)}}
                                >
                                    Edit
                                </button>
                                <img src="/edit_icon.svg" alt="edit icon svg" className="w-5 h-5 mr-3"/>
                            </li>
                            <li className="flex items-center justify-between hover:bg-gray-100">
                                <button
                                    className="flex-grow block px-4 py-2 text-sm text-red-600 w-full text-left"
                                    onClick={() => {
                                        setDeleteModal(true);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Delete
                                </button>
                                <img src="/red-delete-icon.svg" alt="delete icon svg" className="w-5 h-5 mr-3"/>
                            </li>
                        </ul>

                    </div>
                </div>
            }
            {deleteModal &&
                <DeleteModal
                    onClose={() => setDeleteModal(false)}
                    onConfirm={() => {handleConfirmDelete(); setDeleteModal(false); }}
                    title={"Are you sure to suppress this Contact ? "}
                />
            }
        </div>
    );
};

export default DropdownMenu;
