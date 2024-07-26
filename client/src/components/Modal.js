// components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSave, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div>{children}</div>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                        onClick={onSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;