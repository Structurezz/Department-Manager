import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaBuilding } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 600px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.5s ease-in-out;
`;

const Heading = styled.h1`
    color: #00509e;
    font-size: 1.5rem;
`;

const Text = styled.p`
    color: #333;
`;

const DepartmentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const DepartmentItem = styled.li`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer; /* Change cursor to indicate clickable item */

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #e6f7ff;
        transform: scale(1.02);
    }
`;

const Icon = styled(FaBuilding)`
    margin-right: 10px;
    color: #00509e;
    transition: transform 0.2s;

    ${DepartmentItem}:hover & {
        transform: rotate(360deg);
    }
`;

const SubDepartmentList = styled.ul`
    list-style-type: none;
    padding-left: 20px;
    margin: 0;
    transition: max-height 0.3s ease; /* Animation for height */
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')}; /* Control height based on open state */
`;

const SubDepartmentItem = styled.li`
    padding: 5px 0;
    color: #555;
`;

const Departments: React.FC = () => {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDepartments, setOpenDepartments] = useState<number[]>([]); // Track open departments by ID

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('https://department-manager-api.onrender.com/departments');
                setDepartments(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const toggleSubDepartments = (id: number) => {
        setOpenDepartments((prev) =>
            prev.includes(id) ? prev.filter((depId) => depId !== id) : [...prev, id]
        );
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <Container>
            <Heading>Departments</Heading>
            <Text>Here is a list of all departments and their sub-departments:</Text>
            <DepartmentList>
                {departments.map((department) => (
                    <DepartmentItem key={department.id} onClick={() => toggleSubDepartments(department.id)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Icon />
                            <span>{department.name}</span>
                        </div>
                        {/* Render sub-departments with animation */}
                        <SubDepartmentList isOpen={openDepartments.includes(department.id)}>
                            {department.subDepartments && department.subDepartments.map((subDepartment) => (
                                <SubDepartmentItem key={subDepartment.id}>
                                    {subDepartment.name}
                                </SubDepartmentItem>
                            ))}
                        </SubDepartmentList>
                    </DepartmentItem>
                ))}
            </DepartmentList>
        </Container>
    );
};

export default Departments;
