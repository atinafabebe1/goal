import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { useSchools } from '../context/SchoolProvider';

const AddSchoolScreen = ({ navigation }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const { addSchool } = useSchools();

    const [name, setName] = useState('');
    const [establishedYear, setEstablishedYear] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    const handleAddSchool = () => {
        if (!name || !establishedYear || !description || !logo || !location || !latitude || !longitude) {
            setSnackbarText('Please fill out all fields');
            setSnackbarVisible(true);
            return;
        }

        const yearInt = parseInt(establishedYear, 10);
        if (isNaN(yearInt)) {
            setSnackbarText('Established Year must be a valid number');
            setSnackbarVisible(true);
            return;
        }

        const latitudeFloat = parseFloat(latitude);
        const longitudeFloat = parseFloat(longitude);
        if (isNaN(latitudeFloat) || isNaN(longitudeFloat)) {
            setSnackbarText('Latitude and Longitude must be valid numbers');
            setSnackbarVisible(true);
            return;
        }

        const newSchool = {
            name,
            year: yearInt,
            description,
            logo,
            location,
            latitude: latitudeFloat,
            longitude: longitudeFloat,
        };

        addSchool(newSchool);

        setSnackbarText('School added successfully');
        setSnackbarVisible(true);

        // navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Add School</Text>

            <TextInput
                label="School Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                label="Established Year"
                keyboardType="numeric"
                value={establishedYear}
                onChangeText={setEstablishedYear}
                style={styles.input}
            />

            <TextInput
                label="Description"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <TextInput
                label="Logo URL"
                value={logo}
                onChangeText={setLogo}
                style={styles.input}
            />

            <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
            />

            <View style={styles.locationContainer}>
                <TextInput
                    label="Latitude"
                    keyboardType="numeric"
                    value={latitude}
                    onChangeText={setLatitude}
                    style={styles.locationInput}
                />

                <TextInput
                    label="Longitude"
                    keyboardType="numeric"
                    value={longitude}
                    onChangeText={setLongitude}
                    style={styles.locationInput}
                />
            </View>

            <Button mode="contained" onPress={handleAddSchool} style={styles.addButton}>
                Add School
            </Button>
            <View style={styles.snackbarContainer}>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    style={styles.snackbar}
                >
                    {snackbarText}
                </Snackbar>
            </View>

        </ScrollView>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
            padding: 20,
            backgroundColor: theme.colors.background,
        },
        heading: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.colors.primary,
            textAlign: 'center',
        },
        input: {
            marginBottom: 16,
            backgroundColor: theme.colors.surface,
        },
        locationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
        },
        locationInput: {
            flex: 1,
            marginRight: 8,
        },
        addButton: {
            marginTop: 20,
            backgroundColor: theme.colors.primary,
        },
        snackbarContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        snackbar: {
            backgroundColor: theme.colors.accent,
            width: '100%',
            borderRadius: 8,
        },
    });

export default AddSchoolScreen;
