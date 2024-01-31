import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import SchoolCard from '../components/SchoolCard';

const SearchResults = ({ route, navigation }) => {
    const { searchResults } = route.params;

    const navigateToSchoolDetails = (school) => {
        navigation.navigate('School', { school });
    };

    return (
        <View style={styles.container}>
            {searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultItem}
                            onPress={() => navigateToSchoolDetails(item)}
                        >
                            <SchoolCard
                                school={item}
                                style={{ container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 5, }, logo: { width: 50, height: 50, borderRadius: 25, marginRight: 10, }, textContainer: { flex: 1, }, schoolName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, }, description: { fontSize: 12, color: 'gray', }, }}
                            />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text>No results found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },

});

export default SearchResults;
