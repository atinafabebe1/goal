import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { MaterialIcons } from 'react-native-vector-icons';
import { useSchools } from '../context/SchoolProvider';

const School = ({ route }) => {
    const { school } = route.params;
    const { rateSchool } = useSchools();



    const theme = useTheme();
    const viewShotRef = useRef(null);
    const screenHeight = Dimensions.get('window').height;
    const [expanded, setExpanded] = useState(false);
    const [rating, setRating] = useState(school.rating || 0);


    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
        school.rating = selectedRating;
        console.log(school.numberOfUserrate)

        rateSchool(school, () => {
            // Handle 
        }, (error) => {
            console.error('Error updating school rating:', error);
        });
    };


    const renderStars = () => {
        const stars = [];
        const maxStars = 5;

        for (let i = 1; i <= maxStars; i++) {
            const iconName = i <= rating ? 'star' : 'star-border';
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                    <MaterialIcons name={iconName} size={30} color={"#ffd700"} />
                </TouchableOpacity>
            );
        }

        return stars;
    };

    const handleShare = async () => {
        try {
            const uri = await captureRef(viewShotRef, {
                format: 'png',
                quality: 0.8,
            });
            if (!uri) {
                console.error('Error capturing view snapshot: URI is null');
                return;
            }

            const result = await Sharing.shareAsync(uri);

            if (result !== null) {
                if (result.action === Sharing.sharedAction) {
                    if (result.activityType) {
                        console.log(`Shared via ${result.activityType}`);
                    } else {
                        console.log('Shared successfully');
                    }
                } else if (result.action === Sharing.dismissedAction) {
                    console.log('Sharing dismissed');
                }
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: theme.colors.background,
        },
        logo: {
            width: '100%',
            height: screenHeight * 0.5,
            marginBottom: 20,
            resizeMode: 'cover',
            borderRadius: 10,
        },
        schoolName: {
            fontWeight: 'bold',
            fontSize: 32,
            textAlign: 'center',
            color: theme.colors.primary,
            marginBottom: 8,
        },
        location: {
            color: theme.colors.accent,
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 24,
        },
        description: {
            fontSize: 20,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: 12,
        },
        year: {
            fontSize: 18,
            color: theme.colors.primary,
            textAlign: 'center',
            marginBottom: 16,
        },
        map: {
            height: 200,
            marginVertical: 20,
            borderRadius: 10,
        },
        shareButton: {
            backgroundColor: theme.colors.primary,
            padding: 12,
            borderRadius: 8,
            alignSelf: 'center',
            marginTop: 20,
        },
        readMoreButton: {
            color: theme.colors.primary,
            fontSize: 16,
            textAlign: 'center',
            textDecorationLine: 'underline',
            marginTop: 2,
            marginBottom: 20
        },
        shareButtonText: {
            color: theme.colors.background,
            fontSize: 18,
            textAlign: 'center',
        },
        starContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
        },
    });
    return (
        <ScrollView>
            <View style={styles.container}>

                <ViewShot ref={viewShotRef} >

                    <Image source={{ uri: school.logo }} style={styles.logo} />

                    <Text style={styles.schoolName}>{school.name}</Text>
                    <Text style={styles.location}>{school.location}</Text>
                </ViewShot>
                <Text style={styles.description}>
                    {expanded
                        ? school.description
                        : school.description.length > 80
                            ? `${school.description.slice(0, 80)}...`
                            : school.description}
                </Text>

                {!expanded && school.description.length > 80 && (
                    <Text onPress={toggleDescription} style={styles.readMoreButton}>
                        Read More
                    </Text>
                )}
                <Text style={styles.year}>Founded in {school.year}</Text>
                <View style={styles.starContainer}>{renderStars()}</View>
                <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: school.latitude,
                        longitude: school.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: school.latitude, longitude: school.longitude }}
                        title={school.name}
                    />
                </MapView>
            </View>
        </ScrollView>
    );
};

export default School;
