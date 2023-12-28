import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SchoolCard from '../components/SchoolCard';

const mockSchoolData = [
    { id: 1, name: 'School A', yearFounded: 2000, shortDescription: 'A short description of School A', logo: 'url/to/logoA.png' },
    { id: 2, name: 'School B', yearFounded: 2010, shortDescription: 'A short description of School B', logo: 'url/to/logoB.png' },
];

const SchoolList = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>School List</Text>
            {mockSchoolData.map((school) => (
                <SchoolCard key={school.id} school={school} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default SchoolList;
