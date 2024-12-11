import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

// Animation for fading in and out
const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-20px);
    }
`;

const Form = styled.form`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #00509e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #003f7d;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const SuccessMessage = styled.div<{ isVisible: boolean }>`
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s ease forwards;
`;

const Login: React.FC = () => {
    const { setUsername } = useAuth();
    const [localUsername, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successVisible, setSuccessVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('https://department-manager-api.onrender.com/auth/login', {
                username: localUsername,
                password,
            });

            // Log the response to check its structure
            console.log('Response:', response.data);

            // Check if the response contains an access token
            if (response.data && response.data.access_token) {
                const { access_token } = response.data; // Get the access token
                setUsername(localUsername); // Set the username in context
                localStorage.setItem('access_token', access_token); // Store the token in local storage
                setSuccessVisible(true); // Show success message

                // Navigate after a short delay
                setTimeout(() => {
                    setSuccessVisible(false);
                    navigate('/dashboard');
                }, 2000);
            } else {
                setError('Invalid credentials, please try again.');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <>
            {successVisible && <SuccessMessage isVisible={successVisible}>Login successful!</SuccessMessage>}
            <Form onSubmit={handleLogin}>
                <label>Username:</label>
                <Input
                    type="text"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
                <label>Password:</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">Login</Button>
            </Form>
        </>
    );
};

export default Login;
