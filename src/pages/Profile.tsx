import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext.tsx'; // Import your Auth context

const ProfileContainer = styled.div`
    padding: 30px;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    min-height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    color: #0d47a1;
    margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const Profile: React.FC = () => {
    const { userId } = useAuth(); // Get userId from Auth context
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Start loading
            try {
                if (!userId) {
                    throw new Error('User ID is not available. Please log in.');
                }

                console.log('Fetching profile for user ID:', userId);
                const response = await fetch(`https://department-manager-api.onrender.com/auth/users/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response received:', response); // Log response

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error ${response.status}: ${errorText}`); // Log error details
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const profileData = await response.json();
                console.log('Profile Data:', profileData); // Log profile data
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError(error instanceof Error ? error.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]); // Dependency on userId to re-fetch if it changes

    return (
        <ProfileContainer>
            <Title>Profile Details</Title>
            {loading && <p>Loading profile...</p>}
            {error && <p>Error: {error}</p>}
            {profile && (
                <ProfileDetails>
                    <h2>{profile.fullName || 'User'}</h2> {/* Display full name */}
                    <p><strong>Email:</strong> {profile.email || 'No email provided'}</p>
                    <p><strong>Username:</strong> {profile.username || 'No username available'}</p>
                    <p><strong>ID:</strong> {profile.id || 'No ID available'}</p> {/* Display user ID */}
                </ProfileDetails>
            )}
        </ProfileContainer>
    );
};

export default Profile;
