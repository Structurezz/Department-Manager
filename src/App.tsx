import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx'; 
import Home from './pages/Home.tsx'; 
import Departments from './components/departmentList.tsx'; 
import Login from './pages/Login.tsx'; 
import SignUp from './pages/Sign-Up.tsx';
import Dashboard from './pages/Dashboard.tsx'; 
import Profile from './pages/Profile.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/departments" element={<Departments />} /> {/* Departments list */}
                <Route path="/login" element={<Login />} /> {/* Login page */}
                <Route path="/signup" element={<SignUp />} /> {/* Sign-up page */}
                <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
                <Route path="/profile" element={<Profile />} /> {/* Profile page */}
            </Routes>
        </Router>
    );
};

export default App;
