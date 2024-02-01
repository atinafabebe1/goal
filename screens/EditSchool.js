import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { useSchools } from '../context/SchoolProvider';

const EditSchoolScreen = ({ route, navigation }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const { updateSchool } = useSchools();

    const { school } = route.params;

    const [name, setName] = useState(school.name);
    const [establishedYear, setEstablishedYear] = useState(school.year.toString());
    const [description, setDescription] = useState(school.description);
    const [logo, setLogo] = useState(school.logo);
    const [location, setLocation] = useState(school.location);
    const [latitude, setLatitude] = useState(school.latitude.toString());
    const [longitude, setLongitude] = useState(school.longitude.toString());
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    const handleEditSchool = () => {
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

        const editedSchool = {
            id: school.id,
            name,
            year: yearInt,
            description,
            logo,
            location,
            latitude: latitudeFloat,
            longitude: longitudeFloat,
        };

        updateSchool(editedSchool);

        setSnackbarText('School edited successfully');
        setSnackbarVisible(true);

        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Edit School</Text>

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

            <Button mode="contained" onPress={handleEditSchool} style={styles.addButton}>
                Edit School
            </Button>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}
            >
                {snackbarText}
            </Snackbar>
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
        snackbar: {
            backgroundColor: theme.colors.accent,
        },
    });

export default EditSchoolScreen;
