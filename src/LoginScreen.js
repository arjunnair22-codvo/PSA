import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground,TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(email);
      if (userData !== null) {
        console.log('User data found:', JSON.parse(userData));
        // Navigate forward to the next screen
        navigation.navigate('Listings');
      } else {
        console.log('User data not found.');
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.jpeg')}
        style={styles.image}
      >
        <View style={styles.formContainer}>
        <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Submit" onPress={handleLogin} />
    
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height,setHeight ] = useState('');
  const navigation = useNavigation();
  const handleSignup = async () => {
    try {
      const user = {
        email: email,
        phone: phone,
        name: name,
        weight:weight,
        height:height
      };
      await AsyncStorage.setItem(email, JSON.stringify(user));
      navigation.navigate('Listings');

      console.log('User data stored successfully.');
    } catch (error) {
      console.log('Error storing user data: ', error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput placeholder="Name" style={styles.input} value={name}
        onChangeText={(text) => setName(text)}/>
          <TextInput placeholder="Email" style={styles.input} value={email}
        onChangeText={(text) => setEmail(text)}/>
          <TextInput placeholder="Phone" style={styles.input} value={phone}
        onChangeText={(text) => setPhone(text)}/>
          <TextInput placeholder="height" style={styles.input} value={height}
        onChangeText={(text) => setHeight(text)}/>
          <TextInput placeholder="weight" style={styles.input} value={weight}
        onChangeText={(text) => setWeight(text)}/>
          <Button title="Sign Up" onPress={handleSignup}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    borderRadius: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  formContainer: {
    flex:1,
    justifyContent:'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 10,
    color: '#888',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  }
});


export { LoginScreen, SignUpScreen, styles };
