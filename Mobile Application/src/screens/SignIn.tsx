// SignIn.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {signIn} from '../services/auth';

const {height, width} = Dimensions.get('window');

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={require('../image/mangoGreen.png')} style={styles.image} />
      <Text style={styles.appTitle}>MangoDoc</Text>
      <Image source={require('../image/mangoFruits.png')} style={styles.logo} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign In" onPress={handleSignIn} color="#1e90ff" />
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}>
            Don't have an account? Sign Up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  link: {
    marginTop: 16,
    color: '#1e90ff',
  },
  image: {
    width: width,
    height: height / 5,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default SignIn;
