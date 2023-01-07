import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useTheme} from '@react-navigation/native';

import EmailField from '../Components/EmailField';
import PasswordField from '../Components/PasswordField';

import {login} from '../Services/FirebaseAuth';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  // Style
  const {colors} = useTheme();

  const [time, setTime] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('logoutTime').then(res => setTime(res));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    titleWrapper: {
      flex: time == null ? 0.3 : 0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
    },

    timeWrapper: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
    },

    timeText: {fontSize: 16, color: colors.text, padding: 5},

    bodyWrapper: {
      flex: 0.65,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },

    actionsText: {color: colors.primary},
    normalText: {color: colors.text},

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

    actionsWraper: {
      flex: 0.05,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  // Content
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [isPressed, setIsPressed] = useState(false);

  const handleChangeEmail = text => {
    setEmail(text);
  };

  const handleChangePass = text => {
    setPass(text);
  };

  const handleRegister = () => {
    navigation.navigate('register');
  };

  const handleLogin = () => {
    if (email != '' && pass != '') {
      setIsPressed(true);
      login(email, pass).then(async () => {
        await AsyncStorage.setItem(
          'loginTime',
          moment().format('MMMM DD, YYYY, hh:mm a'),
        );

        setIsPressed(false);
        setEmail('');
        setPass('');
      });
    } else {
      Toast.show('Please provide email and password', Toast.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>Demo For Spyre Sync</Text>
      </View>

      {time != null && (
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>Last Logout Time</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      )}

      <View style={styles.bodyWrapper}>
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
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.normalText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.loginBtn}>
            <ActivityIndicator size={'small'} color={colors.primary} />
          </View>
        )}
      </View>

      <View style={styles.actionsWraper}>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.normalText}>
            Not a user? <Text style={styles.actionsText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
