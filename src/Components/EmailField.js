import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const EmailField = ({placeholder, value, handleChange}) => {
  // Style
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    inputview: {
      marginVertical: '3%',
      borderWidth: 1,
      borderRadius: 30,
      paddingHorizontal: '6%',
      height: 65,
      borderColor: colors.text,
    },
    inputtext: {
      fontSize: 16,
      height: '70%',
      color: colors.text,
    },
    placeholderText: {
      fontSize: 12,
      paddingTop: 5,
      color: colors.text,
    },
    placeholderText1: {
      fontSize: 17,
      padding: 5,
      color: colors.text,
    },
  });

  // Content
  const [inputVisible, setInputVisible] = useState(false);

  const showInput = () => {
    setInputVisible(true);
  };

  return (
    <View>
      {inputVisible ? (
        <View style={styles.inputview}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
          <TextInput
            value={value}
            autoFocus={true}
            style={styles.inputtext}
            placeholder={placeholder}
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholderTextColor="grey"
            onChangeText={value => handleChange(value)}
          />
        </View>
      ) : (
        <Pressable
          style={[
            styles.inputview,
            {justifyContent: 'center', borderColor: colors.border},
          ]}
          onPress={showInput}>
          <Text style={styles.placeholderText1}>{placeholder}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmailField;
