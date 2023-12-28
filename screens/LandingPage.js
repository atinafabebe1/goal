import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const LandingPage = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        console.log('Search Query:', searchQuery);
    };

    const navigateToSchools = () => {
        navigation.navigate('Schools');
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search schools..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.overlay}>
                <Text style={styles.heading}>Cheering the future</Text>
                <Text style={styles.subheading}>Discover and connect with schools that shape the future.</Text>
                <TouchableOpacity style={styles.exploreButton} onPress={navigateToSchools}>
                    <Text style={styles.buttonText}>Explore Schools</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 8,
        padding: 8,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
    },
    searchButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'center',
        marginTop: 80, // Add margin to the top to avoid overlapping with the search bar
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 16,
        color: 'black',
        marginBottom: 16,
    },
    exploreButton: {
        backgroundColor: '#27ae60',
        padding: 10,
        borderRadius: 5,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LandingPage;
