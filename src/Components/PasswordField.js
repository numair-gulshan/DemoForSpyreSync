import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const PasswordField = ({placeholder, value, handleChange}) => {
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
  const [secure, setSecure] = useState(true);

  const showInput = () => {
    setInputVisible(true);
  };

  const showHidePassword = () => {
    setSecure(prevState => !prevState);
  };

  return (
    <View>
      {inputVisible ? (
        <View style={styles.inputview}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderColor: colors.text,
            }}>
            <Text style={styles.placeholderText}>{placeholder}</Text>
            <TouchableOpacity onPress={showHidePassword}>
              <Text style={styles.placeholderText}>
                {secure ? 'Show' : 'Hide'}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            value={value}
            autoFocus={true}
            style={styles.inputtext}
            secureTextEntry={secure}
            placeholder={placeholder}
            placeholderTextColor="grey"
            onChangeText={value => handleChange(value)}
          />
        </View>
      ) : (
        <Pressable
          style={[
            styles.inputview,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderColor: colors.border,
            },
          ]}
          onPress={showInput}>
          <Text style={styles.placeholderText1}>{placeholder}</Text>
          <TouchableOpacity onPress={showHidePassword}>
            <Text style={[styles.placeholderText, {fontSize: 15}]}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        </Pressable>
      )}
    </View>
  );
};

export default PasswordField;
