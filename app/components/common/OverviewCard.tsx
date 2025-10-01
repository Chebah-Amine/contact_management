import React from 'react';
import ReadButton from "@/components/common/ReadButton";
import DropdownMenu from "@/components/common/dropdown-menu/DropdownMenu";

type OverviewCardProps = {
    id: number;
    path: string;
    imageUrl: string;
    name: string;
    handleDelete: () => void;
    handleUpdate: () => void;
    desc?: string | undefined;
};

const OverviewCard: React.FC<OverviewCardProps> = ({ id, path, imageUrl, name, handleDelete, handleUpdate, desc }) => {
    return (
        <div className="flex flex-col w-full max-w-xs mt-3 mb-3 ml-4 mr-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            <DropdownMenu
                handleConfirmDelete={handleDelete}
                handleUpdate={handleUpdate}
            />
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={imageUrl} alt={name} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{name}</h5>
                {desc &&
                    <span className="text-sm text-gray-500 dark:text-gray-400">{desc}</span>
                }
            </div>
            <div className="flex flex-row justify-end">
                <ReadButton path={path} />
            </div>
        </div>
    );
};

export default OverviewCard;
