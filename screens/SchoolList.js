import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Button, useTheme } from 'react-native-paper';
import { useSchools } from '../context/SchoolProvider';
import SchoolCard from '../components/SchoolCard';
import SearchInput from '../components/Search';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteModal from '../components/modal/DeleteModal';
import { useUserRole } from '../context/userRole';

const SchoolList = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const { schools, removeSchool } = useSchools();
    const { userRole } = useUserRole()

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleSchoolPress = (school) => {
        navigation.navigate('School', { school });
        setItemsPerPage(5);
    };
    const handleEditPress = (school) => {
        console.log("edited")
        navigation.navigate('Edit School', { school });
        setItemsPerPage(5);
    };

    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedSchools = filteredSchools.slice(0, itemsPerPage);

    const handleLoadMore = () => {
        setItemsPerPage((prev) => prev + 5);
    };


    const handleDeletePress = (school) => {
        setSelectedSchool(school);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        removeSchool(selectedSchool.id)
        setDeleteModalVisible(false);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
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
        iconContainer: {
            flexDirection: 'row',
            position: 'absolute',
            top: 5,
            right: 5,
        },
        editIcon: {
            marginHorizontal: 5,
            fontSize: 25,
            color: "dodgerblue",
        },
        deleteIcon: {
            marginHorizontal: 5,
            fontSize: 25,
            color: "red",
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

                            {userRole === "admin" &&

                                <View style={styles.iconContainer}>
                                    <Icon
                                        name="edit"
                                        style={styles.editIcon}
                                        onPress={() => handleEditPress(school)}
                                    />
                                    <Icon
                                        name="delete"
                                        style={styles.deleteIcon}
                                        onPress={() => handleDeletePress(school)}
                                    />
                                </View>
                            }
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
            {selectedSchool &&
                <DeleteModal
                    schoolName={selectedSchool?.name}
                    visible={deleteModalVisible}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            }

        </View>
    );
};

export default SchoolList;