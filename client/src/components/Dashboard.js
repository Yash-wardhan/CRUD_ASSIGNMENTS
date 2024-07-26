import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Modal from './Modal'; // Assuming this is the profile update modal
import ChangePasswordModal from './ChangePasswordModel';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const res = await axios.get('/api/auth/user', {
                    headers: { 'auth-token': token }
                });
                setUser(res.data);
                setFormData({ name: res.data.name, email: res.data.email });
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleOpenPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    const handleProfileSave = async () => {
        try {
            await axios.put('/api/auth/user', formData, {
                headers: { 'auth-token': localStorage.getItem('authToken') }
            });
            setUser(prev => ({ ...prev, ...formData }));
            toast.success('Profile updated successfully!');
            handleCloseProfileModal();
        } catch (err) {
            console.error('Error updating user:', err);
            toast.error('Error updating profile.');
        }
    };

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match.');
            return;
        }
        try {
            await axios.put('/api/auth/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: { 'auth-token': localStorage.getItem('authToken') }
            });
            toast.success('Password updated successfully!');
            handleClosePasswordModal();
        } catch (err) {
            console.error('Error changing password:', err);
            toast.error('Error changing password.');
        }
    };

    const handleChangeProfile = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete('/api/auth/delete', {
                headers: { 'auth-token': localStorage.getItem('authToken') }
            });
            localStorage.removeItem('authToken');
            navigate('/login');
            toast.success('Account deleted successfully.');
        } catch (err) {
            console.error('Error deleting account:', err);
            toast.error('Error deleting account.');
        }
    };

    if (!user) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar onUpdateClick={handleOpenProfileModal} onLogoutClick={handleLogout} />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white shadow-sm rounded-lg p-6 w-full max-w-md">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {user.name}</h1>
                    <p className="text-gray-600 mb-4">Email: {user.email}</p>
                    <button
                        onClick={handleOpenPasswordModal}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mb-2"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isProfileModalOpen}
                onClose={handleCloseProfileModal}
                onSave={handleProfileSave}
            >
                <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChangeProfile}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChangeProfile}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </Modal>
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
                onSave={handlePasswordChange}
                formData={passwordData}
                onChange={handleChangePassword}
            />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Dashboard;