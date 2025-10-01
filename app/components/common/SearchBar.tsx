import React, { useState } from 'react';

type SearchBarProps = {
    onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    return (
        <div
            className="flex w-1/2 items-center mx-auto my-8"
        >
            <input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow px-4 py-2 mr-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onClick={() => {
                    onSearch(query);
                    setQuery('');
                }}
            >
                Rechercher
            </button>
        </div>
    );
};

export default SearchBar;
