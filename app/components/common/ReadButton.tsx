import Link from 'next/link';
import React from "react";

type ReadButtonProps = {
    path: string;
}
const ReadButton: React.FC<ReadButtonProps> = ({ path}) => {
    return (
        <Link href={path} passHref>
            <span className="inline-flex items-center px-3 py-2 mr-4 mb-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </span>
        </Link>
    );
};

export default ReadButton;
