import React, { createContext, useContext, useEffect, useState } from 'react';
import { SchoolsCrud } from '../database/schoolsCrud';

const SchoolsContext = createContext();

const SchoolsProvider = ({ children }) => {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const loadSchools = () => {
            SchoolsCrud.getSchools(
                (result) => {
                    const loadedSchools = result.rows._array;
                    setSchools(loadedSchools);
                },
                (error) => {
                    console.error('Error loading schools:', error);
                }
            );
        };

        loadSchools();
    }, []);

    const addSchool = (school) => {
        SchoolsCrud.insertSchool(
            school,
            (result) => {
                const newSchool = { ...school, id: result.insertId };
                setSchools((prevSchools) => [...prevSchools, newSchool]);
            },
            (error) => {
                console.error('Error adding school:', error);
            }
        );
    };

    const updateSchool = (school) => {
        SchoolsCrud.updateSchool(
            school,
            () => {
                setSchools((prevSchools) => {
                    const updatedSchools = [...prevSchools];
                    const index = updatedSchools.findIndex((s) => s.id === school.id);
                    if (index !== -1) {
                        updatedSchools[index] = { ...school };
                    }
                    return updatedSchools;
                });
            },
            (error) => {
                console.error('Error updating school:', error);
            }
        );
    };

    const removeSchool = (schoolId) => {
        SchoolsCrud.deleteSchool(
            schoolId,
            () => {
                setSchools((prevSchools) => prevSchools.filter((school) => school.id !== schoolId));
            },
            (error) => {
                console.error('Error removing school:', error);
            }
        );
    };

    return (
        <SchoolsContext.Provider value={{ schools, addSchool, updateSchool, removeSchool }}>
            {children}
        </SchoolsContext.Provider>
    );
};

const useSchools = () => {
    const context = useContext(SchoolsContext);

    if (!context) {
        throw new Error('useSchools must be used within a SchoolsProvider');
    }

    return context;
};

export { SchoolsProvider, useSchools };
