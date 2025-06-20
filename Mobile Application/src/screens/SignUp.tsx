// SignUp.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {signUp} from '../services/auth';

const {height, width} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={require('../image/mangoGreen.png')} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
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
        <Button title="Sign Up" onPress={handleSignUp} color="#1e90ff" />
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
          Already have an account? Sign In
        </Text>
      </View>
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
});

export default SignUp;
