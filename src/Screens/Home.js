import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {logout} from '../Services/FirebaseAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Home = ({navigation}) => {
  // Style
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },

    text: {fontSize: 16, color: colors.text, padding: 5},

    logoutBtn: {
      width: '50%',
      padding: 10,
      borderRadius: 30,
      borderWidth: 1,
      marginTop: 20,
      alignItems: 'center',
      borderColor: colors.border,
    },
  });

  const [time, setTime] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('loginTime').then(res => setTime(res));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(
      'logoutTime',
      moment().format('MMMM DD, YYYY, hh:mm a'),
    );

    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Last Login Time</Text>
      <Text style={styles.text}>{time}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
