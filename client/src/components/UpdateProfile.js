import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        name: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch current user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/auth/user', {
                    headers: { 'auth-token': localStorage.getItem('authToken') }
                });
                setFormData({
                    name: response.data.name,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            await axios.put('/api/auth/user', formData, {
                headers: { 'auth-token': localStorage.getItem('authToken') }
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Show loading message while fetching data
    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UpdateProfile;