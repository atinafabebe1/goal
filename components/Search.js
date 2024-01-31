import React from 'react';
import { Searchbar, useTheme } from 'react-native-paper';

const SearchInput = ({ placeholder, onChangeText, value, onSubmitEditing, editable, style }) => {
    const theme = useTheme();

    return (
        <Searchbar
            placeholder={placeholder}

            placeholderTextColor={theme.colors.secondary}
            onChangeText={onChangeText}
            value={value}
            onSubmitEditing={onSubmitEditing}
            style={{ ...style }}
            editable={editable}
        />
    );
};

export default SearchInput;
