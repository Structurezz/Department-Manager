import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSignInAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';

// Animation for fading in
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
    text-align: center;
    margin: 50px 0;
    animation: ${fadeIn} 1s ease-in-out; // Add fade-in animation
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #00509e;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1.25rem;
    margin-bottom: 40px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #00509e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px; // Add margin for spacing

    &:hover {
        background-color: #003f7f; // Change color on hover
        transform: scale(1.05); // Scale on hover for effect
    }

    transition: background-color 0.3s, transform 0.3s; // Smooth transition
`;

const SignUpLink = styled.p`
    margin-top: 20px;
    font-size: 1.1rem;

    a {
        color: #00509e;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
            color: #003f7f; // Change color on hover
        }
    }
`;

const FeatureSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
`;

const Feature = styled.div`
    margin: 0 20px;
    text-align: center;
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 3rem;
    color: #00509e;
    margin-bottom: 10px;
`;

const Home: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleViewDepartments = () => {
        navigate('/departments'); // Navigate to departments page
    };

    const handleSignUp = () => {
        navigate('/signup'); // Navigate to sign-up page
    };

    return (
        <Container>
            <Title>Welcome to the Department Manager</Title>
            <Description>
                This application helps you manage various departments efficiently. You can view, add, and manage departments all in one place. Let's get started!
            </Description>
            <Button onClick={handleViewDepartments}>View Departments</Button>
            <SignUpLink>
                Don't have an account? <span onClick={handleSignUp}>Sign up here</span>
            </SignUpLink>

            <h2>Features</h2>
            <FeatureSection>
                <Feature>
                    <Icon icon={faClipboardList} />
                    <h3>Manage Departments</h3>
                    <p>Easily create and manage all your departments.</p>
                </Feature>
                <Feature>
                    <Icon icon={faUsers} />
                    <h3>User Management</h3>
                    <p>Handle user registrations and access effortlessly.</p>
                </Feature>
                <Feature>
                    <Icon icon={faSignInAlt} />
                    <h3>Quick Sign In</h3>
                    <p>Fast and secure sign in for users.</p>
                </Feature>
            </FeatureSection>
        </Container>
    );
};

export default Home;
