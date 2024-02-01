import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUserRole } from '../context/userRole';

export const LoginPage = () => {
    const { userRole, setUserRole } = useUserRole();

    const handleSetAdminRole = () => {
        setUserRole('admin');
    };

    const handleSetUserRole = () => {
        setUserRole('user');
    };

    return (
        <View>
            <Text>User Role: {userRole}</Text>
            <Button title="Set Admin Role" onPress={handleSetAdminRole} />
            <Button title="Set User Role" onPress={handleSetUserRole} />
        </View>
    );
};

