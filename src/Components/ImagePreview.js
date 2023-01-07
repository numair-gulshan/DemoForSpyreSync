import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const Home = ({images}) => {
  // Style
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    oneImg: {
      height: '100%',
      width: '100%',
    },

    twoImgContainer: {
      flex: 1,
      flexDirection: 'row',
    },

    twoImg: {
      height: '100%',
      width: '50%',
    },

    fourImgContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    fourImg: {
      height: '50%',
      width: '50%',
    },
  });

  // Content
  return (
    <View style={styles.container}>
      {images.length == 1 ? (
        <FastImage source={{uri: images[0].uri}} style={styles.oneImg} />
      ) : images.length == 2 ? (
        <View style={styles.twoImgContainer}>
          {images.map((img, index) => {
            return (
              <FastImage
                key={index}
                source={{uri: img.uri}}
                style={styles.twoImg}
              />
            );
          })}
        </View>
      ) : images.length == 3 ? (
        <View style={styles.container}>
          <View style={styles.container}>
            <FastImage source={{uri: images[0].uri}} style={styles.oneImg} />
          </View>

          <View style={styles.twoImgContainer}>
            <FastImage source={{uri: images[1].uri}} style={styles.twoImg} />
            <FastImage source={{uri: images[2].uri}} style={styles.twoImg} />
          </View>
        </View>
      ) : (
        <View style={styles.fourImgContainer}>
          {images.map((img, index) => {
            return (
              <FastImage
                key={index}
                source={{uri: img.uri}}
                style={styles.fourImg}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Home;
