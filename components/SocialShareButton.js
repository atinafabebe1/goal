import React from 'react';
import Button from './Button';

const SocialShareButton = ({ onPress }) => {
    return <Button onPress={onPress} title="" style={{ backgroundColor: '#27ae60', marginVertical: 10 }} />;
};

export default SocialShareButton;
