import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const SchoolCard = ({ school, style, children }) => {
    return (
        <View style={style.container}>
            <Image source={school.logo} style={style.logo} />
            <View style={style.textContainer}>
                <Text style={style.schoolName}>{school.name}</Text>
                {children}
            </View>
        </View>
    );
};

export default SchoolCard;
