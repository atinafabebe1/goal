import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Button, useTheme } from 'react-native-paper';
import SchoolCard from '../components/SchoolCard';
import { useSchools } from '../context/SchoolProvider';
import SearchInput from '../components/Search';
import { useTranslation } from 'react-i18next';

const SchoolList = () => {
    const { t } = useTranslation()

    const theme = useTheme()
    const { schools } = useSchools();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const handleSchoolPress = (school) => {
        navigation.navigate('School', { school });
        setItemsPerPage(5);
    };

    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedSchools = filteredSchools.slice(0, itemsPerPage);

    const handleLoadMore = () => {
        setItemsPerPage((prev) => prev + 5)
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginBottom: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: 5,
        },
        logo: {
            width: 70,
            height: 70,
            borderRadius: 5,
            marginRight: 10,
        },
        textContainer: {
            flex: 1,
        },
        schoolName: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 4,
        },
        description: {
            fontSize: 12,
            color: 'gray',
        },
        location: {
            fontSize: 14,
            color: theme.colors.secondary
        },
        searchBar: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 1,
            borderRadius: 40,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            marginHorizontal: 10,
            marginVertical: 20,
        },
        paginationButton: {
            color: theme.colors.primary,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 150,
        },
    });

    return (
        <View style={{ backgroundColor: theme.colors.background }}>
            <SearchInput
                placeholder={t('SearchPlaceHolder')}
                onChangeText={(query) => setSearchQuery(query)}
                value={searchQuery}
                style={styles.searchBar}
            />
            <ScrollView>
                {paginatedSchools.map((school) => (
                    <TouchableOpacity key={school.id} onPress={() => handleSchoolPress(school)}>
                        <SchoolCard school={school} style={styles}>
                            <Text style={styles.location}>{school.location}</Text>
                        </SchoolCard>
                    </TouchableOpacity>
                ))}
                {filteredSchools.length > itemsPerPage && (
                    <Button
                        mode="outlined"
                        onPress={handleLoadMore}
                        style={styles.paginationButton}
                    >
                        Load More
                    </Button>
                )}
            </ScrollView>
        </View>
    );
};

export default SchoolList;
