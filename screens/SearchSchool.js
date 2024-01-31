import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const SearchSchool = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        console.log('Search Query:', searchQuery);
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
                <Button title="Search" onPress={handleSearch} />
            </View>
            {/* Display search results or additional content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default SearchSchool;
