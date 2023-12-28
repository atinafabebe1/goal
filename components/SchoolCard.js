import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SchoolCard = ({ school }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: school.logo }} style={styles.logo} />
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text>{school.shortDescription}</Text>
        </View>
    );
};

export default SchoolCard;

export const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        margin: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 8,
    },
    schoolName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
