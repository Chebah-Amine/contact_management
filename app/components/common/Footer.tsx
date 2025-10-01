// app/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    const year = new Date().getFullYear(); // Obtient l'année courante

    return (
        <footer className="bg-gray-800 text-white text-center p-5 rounded-t-lg mt-4">
            <p className="text-sm">
                &copy; {year} Mon Gestionnaire de contact.
            </p>
            <p className="text-xs">
                FSR-APP
            </p>
        </footer>
    );
};

export default Footer;
