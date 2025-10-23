/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { TextInput} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
//import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';



type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  const handleLogin = () => {
    //Todo : replace with real auth logic
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode='contain'/>
      <Text style={styles.greeting}>Welcome Back</Text>
      <Text style={styles.welcome}>Sign in to continue</Text>


      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input} 
        mode='flat'
        underlineColor='transparent'
        activeUnderlineColor='transparent'
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPasword}
        style={styles.input}
        mode='flat'
        underlineColor='transparent'
        activeUnderlineColor='transparent'
        secureTextEntry
        
      />

    <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
    </TouchableOpacity>


    <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}> Sign In</Text>
    </TouchableOpacity>

    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:6,
        marginBottom:20,
    }
    }>
        <Text style={{fontSize:14,}}>Sign in with</Text>

        <Image source={require('../assets/google.png')}
        style={{
            width:30,
            height: 30,
            marginLeft: 10,
            resizeMode:'contain',
        }}
        />
        <Image source={require('../assets/apple.png')}
        style={{
            width:30,
            height:30,
            marginLeft:10,
            resizeMode:'contain',
        }}
        />
        <Image source={require('../assets/linkedin.png')}
        style={{
            width:30,
            height:30,
            marginLeft: 10,
            resizeMode: 'contain',
        }}
        />
        
    </View>

     
     <View style={styles.bottomText}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
            <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
     </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 32,
    color: '#212121',
  },
 greeting:{
    textAlign:'center',
    fontSize: 30,
    fontWeight:'700',
    marginBottom: 10,
    color: '#1C457A'
 },
  input: {
     height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius:10,
    shadowColor:'#1c0909ff',
    shadowOpacity:0.5,
    shadowRadius:2,
    borderStyle:'solid',
  },
  forgot: {
    textAlign: 'right',
    color: '#1976D2',
    marginBottom: 24,
  },
  button:{
    alignItems:'center',
    borderRadius: 15,
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor:'#1976D2',
  },
  buttonText:{
    fontWeight:'bold',
    fontSize: 20,
    color:'#fff'
  },
  bottomText:{
    flexDirection: 'row',
    justifyContent:'center',
  },
  signup:{
    color: '#1976D2',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
