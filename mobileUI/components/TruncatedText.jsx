import { View, Text } from 'react-native'
import React from 'react'

const TruncatedText = ({ text, wordLimit, style }) => {
  const truncateWords = (text, limit) => {
    const words = text.split(' ');
    return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...';
  };

  return <Text style={style}>{truncateWords(text, wordLimit)}</Text>;
};

export default TruncatedText;