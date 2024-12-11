import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const SuccessMessage = styled.p`
    color: green;
    text-align: center;
`;

const SignUp: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Check if passwords match without trimming
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        

        try {
            const response = await axios.post('https://department-manager-api.onrender.com/auth/register', {
                fullName,
                email,
                username,
                password,
                confirmPassword,
            });
            console.log('Sign up successful:', response.data);
            setSuccess('Sign up successful! You can now log in.');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Sign up failed. Please try again.');
        }
    };

    return (
        <Form onSubmit={handleSignUp}>
            <div>
                <label>Full Name:</label>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Username:</label>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <Button type="submit">Sign Up</Button>
        </Form>
    );
};

export default SignUp;
