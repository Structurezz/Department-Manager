import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background: #00509e; /* Header background color */
    padding: 10px 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Nav = styled.ul`
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    color: white;
    cursor: pointer;
`;

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f2f2f2; /* Updated dropdown background color */
    color: black;
    min-width: 150px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1;
    right: 0;

    &.show {
        display: block;
    }
`;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #ddd; /* Change background on hover */
    }
`;

const Header: React.FC = () => {
    const { username, setUsername } = useAuth(); // Access global state and setter
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('https://department-manager-api.onrender.com/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            setUsername(null);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const handleProfileClick = () => {
        console.log('Navigating to profile...');
        navigate('/profile'); // Just navigate
    };
    
    

    return (
        <HeaderContainer>
            <h1>Department Manager</h1>
            <Nav>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/departments">Departments</NavLink></li>
                {username && (
                    <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li> {/* Dashboard Link */}
                        <li>
                            <DropdownContainer onClick={() => setIsDropdownOpen((prev) => !prev)}>
                                {username} ▼
                                <DropdownContent className={isDropdownOpen ? 'show' : ''}>
                                    <DropdownItem onClick={handleProfileClick}>Profile</DropdownItem>
                                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                </DropdownContent>
                            </DropdownContainer>
                        </li>
                    </>
                )}
                {!username && (
                    <li><NavLink to="/login">Login</NavLink></li>
                )}
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
