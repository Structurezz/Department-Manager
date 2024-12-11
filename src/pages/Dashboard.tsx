import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaSort, FaTrashAlt, FaPlusCircle, FaEdit, FaChevronDown, FaChevronRight } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const popIn = keyframes`
    from {
        transform: scale(0.8);
    }
    to {
        transform: scale(1);
    }
`;

// Styled Components
const Container = styled.div`
    padding: 30px;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #ffe5b4, #ffcc80);
    min-height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    color: #e65100;
    animation: ${fadeIn} 0.5s ease-out;
    margin-bottom: 30px;
    font-size: 2.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 500px;
    margin: 0 auto 30px auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    animation: ${popIn} 0.3s ease;

    input {
        padding: 12px;
        border: 2px solid #ff9800;
        border-radius: 8px;
        transition: border-color 0.3s;

        &:focus {
            outline: none;
            border-color: #ff5722;
        }
    }

    button {
        align-self: flex-end;
        padding: 12px 18px;
        background: #ff5722;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s;

        &:hover {
            background: #e64a19;
            transform: scale(1.05);
        }
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        text-align: left;
        padding: 12px;
        border: 1px solid #ddd;
        transition: background 0.3s;
    }

    th {
        background-color: #ff9800;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;

        &:hover {
            background-color: #fb8c00;
        }
    }

    tr:nth-child(even) {
        background-color: #ffe0b2;
    }

    tr:hover {
        background-color: #ffe57f;
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #ff5722;
    transition: color 0.3s;

    &:hover {
        color: #e64a19;
    }
`;

const SubDepartmentList = styled.ul`
    margin-left: 20px;
    list-style-type: disc;
    animation: ${fadeIn} 0.5s ease-out;
    color: #555;
`;

const SubDepartmentItem = styled.li`
    display: flex;
    align-items: center;

    &:hover {
        background-color: #ffe57f;
    }
`;

// Dashboard Component
const Dashboard: React.FC = () => {
    const [departments, setDepartments] = useState<any[]>([]);
    const [queries, setQueries] = useState<any[]>([]);
    const [assessments, setAssessments] = useState<any[]>([]);
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [bestEmployees, setBestEmployees] = useState<any[]>([]);
    const [isAsc, setIsAsc] = useState<boolean>(true);
    const [newDepartment, setNewDepartment] = useState({
        name: '',
        description: '',
        subDepartments: [] as { name: string; description: string }[]
    });

    // Fetch Departments and additional data
    useEffect(() => {
        fetchDepartments();
        fetchQueries();
        fetchAssessments();
        fetchVacancies();
        fetchBestEmployees();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('https://department-manager-api.onrender.com/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchQueries = async () => {
        try {
            const response = await axios.get('https://department-manager-api.onrender.com/queries'); // Adjust the endpoint accordingly
            setQueries(response.data);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    const fetchAssessments = async () => {
        try {
            const response = await axios.get('https://department-manager-api.onrender.com/assessments'); // Adjust the endpoint accordingly
            setAssessments(response.data);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        }
    };

    const fetchVacancies = async () => {
        try {
            const response = await axios.get('https://department-manager-api.onrender.com/vacancies'); // Adjust the endpoint accordingly
            setVacancies(response.data);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };

    const fetchBestEmployees = async () => {
        try {
            const response = await axios.get('https://department-manager-api.onrender.com/best-employees'); // Adjust the endpoint accordingly
            setBestEmployees(response.data);
        } catch (error) {
            console.error('Error fetching best employees:', error);
        }
    };

    const handleSort = (key: string) => {
        setIsAsc(!isAsc);
        const sorted = [...departments].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
            return isAsc
                ? String(valueA).localeCompare(String(valueB))
                : String(valueB).localeCompare(String(valueA));
        });
        setDepartments(sorted);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const departmentData = {
                name: newDepartment.name,
                description: newDepartment.description,
                subDepartments: newDepartment.subDepartments,
            };

            const response = await axios.post('https://department-manager-api.onrender.com/departments', departmentData);
            setDepartments([...departments, response.data]);
            // Reset the form
            setNewDepartment({ name: '', description: '', subDepartments: [] });
        } catch (error) {
            console.error('Error creating department:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://department-manager-api.onrender.com/departments/${id}`);
            setDepartments(departments.filter(dep => dep.id !== id));
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const handleEdit = (department: any) => {
        console.log("Edit department:", department);
        // Implement edit functionality if needed
    };

    const renderSubDepartments = (subDepartments: any[]) => {
        if (!subDepartments || subDepartments.length === 0) return null;
        return (
            <SubDepartmentList>
                {subDepartments.map(sub => (
                    <SubDepartmentItem key={sub.id}>
                        <FaChevronRight style={{ marginRight: '5px' }} />
                        <strong>{sub.name}</strong> - {sub.description || 'N/A'}
                        <Button onClick={() => handleEdit(sub)}><FaEdit /></Button>
                        <Button onClick={() => handleDelete(sub.id)}><FaTrashAlt /></Button>
                        <FaChevronDown style={{ marginLeft: '5px', cursor: 'pointer' }} />
                        {renderSubDepartments(sub.subDepartments)}
                    </SubDepartmentItem>
                ))}
            </SubDepartmentList>
        );
    };

    return (
        <Container>
            <Title>Dashboard</Title>

            <Form onSubmit={handleCreate}>
                <h2>Create Department</h2>
                <input
                    type="text"
                    placeholder="Department Name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                />
                
                <h3>Sub-Departments</h3>
                {newDepartment.subDepartments.map((sub, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Sub-Department Name"
                            value={sub.name}
                            onChange={(e) => {
                                const updatedSubs = [...newDepartment.subDepartments];
                                updatedSubs[index].name = e.target.value;
                                setNewDepartment({ ...newDepartment, subDepartments: updatedSubs });
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Sub-Department Description"
                            value={sub.description}
                            onChange={(e) => {
                                const updatedSubs = [...newDepartment.subDepartments];
                                updatedSubs[index].description = e.target.value;
                                setNewDepartment({ ...newDepartment, subDepartments: updatedSubs });
                            }}
                        />
                    </div>
                ))}
              <button type="button" onClick={() => setNewDepartment({
    ...newDepartment,
    subDepartments: [...newDepartment.subDepartments, { name: '', description: '' }]
})}>
    <FaPlusCircle style={{ marginRight: '5px' }} /> Add Sub-Department
</button>

                <button type="submit">Create Department</button>
            </Form>

            <Table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Department Name <FaSort /></th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.id}>
                            <td>{department.name}</td>
                            <td>{department.description}</td>
                            <td>
                                <Button onClick={() => handleEdit(department)}><FaEdit /></Button>
                                <Button onClick={() => handleDelete(department.id)}><FaTrashAlt /></Button>
                                {renderSubDepartments(department.subDepartments)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Queries</h2>
            {/* Render Queries List */}
            <ul>
                {queries.map(query => (
                    <li key={query.id}>{query.title}</li>
                ))}
            </ul>

            <h2>Assessments</h2>
            {/* Render Assessments List */}
            <ul>
                {assessments.map(assessment => (
                    <li key={assessment.id}>{assessment.title}</li>
                ))}
            </ul>

            <h2>Vacancies</h2>
            {/* Render Vacancies List */}
            <ul>
                {vacancies.map(vacancy => (
                    <li key={vacancy.id}>{vacancy.title}</li>
                ))}
            </ul>

            <h2>Best Employees</h2>
            {/* Render Best Employees List */}
            <ul>
                {bestEmployees.map(employee => (
                    <li key={employee.id}>{employee.name}</li>
                ))}
            </ul>
        </Container>
    );
};

export default Dashboard;
