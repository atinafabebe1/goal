import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const SchoolCard = ({ school, style, children }) => {
    useEffect(() => {
        console.log(school.logo)
    }, [])
    return (
        <View style={style.container}>
            <Image source={{ uri: school.logo }} style={style.logo} />
            <View style={style.textContainer}>
                <Text style={style.schoolName}>{school.name}</Text>
                {children}
            </View>
        </View>
    );
};

export default SchoolCard;
