import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigator from './src/Navigator';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigator />
    </SafeAreaView>
  );
};

export default App;
