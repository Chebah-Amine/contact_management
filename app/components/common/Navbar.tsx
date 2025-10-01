"use client";
import Link from 'next/link';
import React, {useState} from 'react';
import LoginPopup from "@/components/common/LoginPopup";

// Composant NavLink avec effet de survol
const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
    return (
        <Link href={href} passHref>
      <span className="cursor-pointer text-gray-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200">
        {label}
      </span>
        </Link>
    );
};

const Navbar: React.FC = () => {
    const [logDisplay, setLogDisplayed] = useState<boolean>(false);

    return (
        <nav className="bg-white shadow-md rounded-b-lg">
            <div className="mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <div className="flex space-x-4">
                        {/* Les liens de la navbar */}
                        <NavLink href="/" label="Home" />
                        <NavLink href="/contacts" label="Contact" />
                        <NavLink href="/groups" label="Group" />
                    </div>
                    {/* Boutons de connexion et d'inscription avec effet de survol */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="px-4 py-2 text-white bg-green-500 rounded-md shadow-sm font-medium hover:bg-green-600 transition-colors duration-200"
                            onClick={() => setLogDisplayed(true)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            {
                logDisplay &&
                <LoginPopup
                    onClose={() => {setLogDisplayed(false)} }
                />
            }
        </nav>
    );
};

export default Navbar;
