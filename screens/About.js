import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>
                Information about goal
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
        lineHeight: 24,
    },
});

export default AboutPage;
