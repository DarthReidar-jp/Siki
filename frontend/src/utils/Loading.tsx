import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => (
    <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-4xl text-blue-500 animate-spin" />
    </div>
);

export default Loading;