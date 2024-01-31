import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import schoolsData from '../data/schools';

const SchoolsContext = createContext();

const SchoolsProvider = ({ children }) => {
    const [loadedSchools, setLoadedSchools] = useState([]);
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const loadSchools = async () => {
            try {
                const storedSchools = await AsyncStorage.getItem('schools');
                const parsedSchools = storedSchools ? JSON.parse(storedSchools) : schoolsData;
                setLoadedSchools(parsedSchools);
                setSchools(parsedSchools);
            } catch (error) {
                console.error('Error loading schools:', error);
            }
        };

        loadSchools();
    }, []);

    useEffect(() => {
        const saveSchools = async () => {
            try {
                await AsyncStorage.setItem('schools', JSON.stringify(schools));
            } catch (error) {
                console.error('Error saving schools:', error);
            }
        };

        saveSchools();
    }, [schools]);

    useEffect(() => {
        if (JSON.stringify(schoolsData) !== JSON.stringify(loadedSchools)) {
            setLoadedSchools(schoolsData);
            setSchools(schoolsData);
        }
    }, [loadedSchools]);

    return (
        <SchoolsContext.Provider value={{ schools, setSchools }}>
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
