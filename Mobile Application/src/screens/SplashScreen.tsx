import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      auth().onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('SignIn');
        }
      });
    }, 3000); // 3 seconds timeout

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../image/mangoFruits.png')} style={styles.logo} />
      <Text style={styles.appName}>MangoDoc</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default SplashScreen;
