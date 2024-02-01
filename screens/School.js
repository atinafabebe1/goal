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
import * as Font from 'expo-font';
import { useTheme } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import ViewShot, { captureRef } from 'react-native-view-shot';

const School = ({ route }) => {
    const { school } = route.params;
    const theme = useTheme();
    const viewShotRef = useRef(null);
    const screenHeight = Dimensions.get('window').height;
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'OpenSans-Regular': require('../assets/fonts/static/OpenSans-Regular.ttf'),
                'OpenSans-Bold': require('../assets/fonts/static/OpenSans-Bold.ttf'),
            });
            setFontsLoaded(true);
        };


        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }


    const toggleDescription = () => {
        setExpanded(!expanded);
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
            fontFamily: 'OpenSans-Bold',
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
            fontFamily: 'OpenSans-Regular',
            fontSize: 20,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: 12,
        },
        year: {
            fontFamily: 'OpenSans-Regular',
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
