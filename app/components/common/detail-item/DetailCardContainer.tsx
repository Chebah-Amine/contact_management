import React, {ReactNode} from 'react';
import './DetailCardContainer.scss';
import Link from "next/link";
import DropdownMenu from "@/components/common/dropdown-menu/DropdownMenu";

type DetailCardContainerProps = {
    title: string;
    children: ReactNode;
    handleDelete: () => void;
    handleUpdate: () => void;
}
export const DetailCardContainer: React.FC<DetailCardContainerProps> = ({title, children, handleDelete, handleUpdate}) => {
    return (
        <div className="flex justify-center p-4 mt-4 bg-gray-50">
            <div className="flex flex-col items-center w-3/5 p-4 border-2 bg-white shadow-lg rounded-lg linear-gradient-bg">
                <div className="flex justify-end w-full mb-10">
                    <DropdownMenu
                        handleConfirmDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                </div>
                <h1 className="text-3xl uppercase font-bold mt-5 mb-5">{title}</h1>
                <img src="/contact-icon-detail.png" alt="Contact icon" className="w-20 h-20 mb-10"/>
                {children}
            </div>
        </div>
    );
};

type DetailCardSection = {
    title: string;
    children: ReactNode;
    direction?: "col"|"raw";
}

export const DetailCardSection: React.FC<DetailCardSection> = ({title, children, direction}) => {
    let style = "flex flex-col mt-4 ml-4";

    if (direction === "raw"){
        style = "flex mt-4 ml-4 flex-wrap"
    }
    return (
        <div className="flex flex-col m-2 w-full p-4 border-t-4 border-stone-950">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className={style}>
                {children}
            </div>
        </div>
    )
}

type ItemSectionProps = {
    title: string;
    value: string | number;
}
export const ItemSection: React.FC<ItemSectionProps> = ({title, value}) => {
    return (
        <div className="flex justify-between items-center p-3 bg-white shadow-sm rounded-lg border border-gray-200 my-1 hover:bg-gray-50">
            <span className="text-sm font-medium uppercase text-gray-600">
                {title}
            </span>
            <span className="text-lg font-semibold text-gray-900">
                {value}
            </span>
        </div>
    )
}

type LinkCardProps = {
    title: string;
    value: string;
    path: string;
}
export const LinkCard: React.FC<LinkCardProps> = ({ title, value, path }) => {
    return (
        <Link href={path} passHref>
            <div className="flex justify-between items-center p-3 mr-3 bg-white shadow-sm rounded-lg border border-gray-200 my-1 hover:bg-gray-100 transition duration-200 transform hover:-translate-y-1">
                <div className="flex flex-col mr-10">
                    <span className="text-xs font-medium tracking-wide text-gray-400">
                        {title}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                        {value}
                    </span>
                </div>
                <img src="/right-arrow.svg" alt="Right arrow" className="w-5 h-5"/>
            </div>
        </Link>
    )
}


