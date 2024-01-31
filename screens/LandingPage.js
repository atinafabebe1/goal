import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import {
    Button,
    Searchbar,
    List,
    TouchableRipple,
    useTheme,
} from 'react-native-paper';
import { useSchools } from '../context/SchoolProvider';
import SearchInput from '../components/Search';
import { useTranslation } from 'react-i18next';

const LandingPage = ({ navigation }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const styles = createStyles(theme);

    const { schools } = useSchools();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        setIsLoading(true);
        const results = schools.filter((school) =>
            school.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
    };

    useEffect(() => {
        if (searchQuery !== '') {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSchoolClick = (school) => {
        navigation.navigate('School', { school });
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleSearchButtonClick = () => {
        handleSearch();
        navigation.navigate('Result', { searchResults, searchTerm: searchQuery });
        setSearchQuery('');
        setSearchResults([]);
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background2.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.heading}>{t('Hero.title')}</Text>
                    <Text style={styles.subheading}>
                        {t('Hero.description')}
                    </Text>

                    <SearchInput
                        placeholder={t('SearchPlaceHolder')}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        onSubmitEditing={handleSearchButtonClick}
                        editable={!isLoading}
                        style={styles.searchBar}
                    />

                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    )}

                    {searchResults.length > 0 && (
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                        >
                            <List.Section>
                                {searchResults.map((item) => (
                                    <TouchableRipple
                                        key={item.id}
                                        onPress={() => handleSchoolClick(item)}
                                        style={styles.searchResultItemContainer}
                                        rippleColor={theme.colors.primary}
                                    >
                                        <List.Item
                                            title={item.name}
                                            titleStyle={styles.searchResultItem}
                                            description={`Location: ${item.location}`}
                                            descriptionStyle={{ color: theme.colors.secondary, fontSize: 16, }}
                                        />
                                    </TouchableRipple>
                                ))}
                            </List.Section>
                        </ScrollView>
                    )}

                    {searchQuery && searchResults.length === 0 && !isLoading && (
                        <Text style={styles.noResultsText}>No results found</Text>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        overlay: {
            flex: 1,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        heading: {
            fontSize: 40,
            color: theme.colors.primary,
            marginBottom: 8,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        subheading: {
            fontSize: 18,
            color: theme.colors.secondary,
            marginBottom: 24,
            textAlign: 'center',
        },
        searchBar: {
            width: '90%',
            marginBottom: 20,
            borderRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
        searchInput: {
            color: theme.colors.primary,
            fontSize: 16,
        },
        loadingOverlay: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
        },
        noResultsText: {
            color: theme.colors.secondary,
            fontSize: 18,
            marginTop: 20,
            textAlign: 'center',
        },
        searchResultItemContainer: {
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.5)',
            paddingVertical: 4,
        },
        searchResultItem: {
            color: theme.colors.primary,
            fontSize: 20,
            marginBottom: 4,
        },
    });

export default LandingPage;
