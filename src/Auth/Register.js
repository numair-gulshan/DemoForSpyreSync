import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import EmailField from '../Components/EmailField';
import PasswordField from '../Components/PasswordField';

import {register} from '../Services/FirebaseAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

const Register = ({navigation}) => {
  // Style
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    backIcon: {
      height: 50,
      width: 50,
      borderRadius: 25,
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleWrapper: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
    },

    bodyWrapper: {
      flex: 0.7,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },

    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },

    actionsText: {color: colors.primary},

    loginBtn: {
      width: '60%',
      alignSelf: 'center',
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 50,
      marginTop: 10,
    },
  });

  // Content
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [isPressed, setIsPressed] = useState(false);

  const passRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );

  const handleChangeName = text => {
    setName(text);
  };

  const handleChangeEmail = text => {
    setEmail(text);
  };

  const handleChangePass = text => {
    setPass(text);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    if (passRegex.test(pass) && name != '' && email != '') {
      setIsPressed(true);
      register(name, email, pass).then(async () => {
        await AsyncStorage.setItem(
          'loginTime',
          moment().format('MMMM DD, YYYY, hh:mm a'),
        );

        setIsPressed(false);
        setName('');
        setEmail('');
        setPass('');
      });
    } else if (name == '' && email == '' && pass == '') {
      Toast.show('All fields are required', Toast.LONG);
    } else if (name == '') {
      Toast.show('Name is required', Toast.LONG);
    } else if (email == '') {
      Toast.show('Email is required', Toast.LONG);
    } else {
      Toast.show(
        'Password should contain lower-case, upper-case letters, numbers, special characters and at least 8 characters',
        Toast.LONG,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBack}>
        <Icon name="arrowleft" size={30} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>Demo For Spyre Sync</Text>
      </View>

      <View style={styles.bodyWrapper}>
        <EmailField
          value={name}
          placeholder="Full Name"
          handleChange={handleChangeName}
        />
        <EmailField
          value={email}
          placeholder="Email"
          handleChange={handleChangeEmail}
        />
        <PasswordField
          value={pass}
          placeholder="Password"
          handleChange={handleChangePass}
        />

        {!isPressed ? (
          <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
            <Text style={{color: colors.text}}>Register</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.loginBtn}>
            <ActivityIndicator size={'small'} color={colors.primary} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Register;
