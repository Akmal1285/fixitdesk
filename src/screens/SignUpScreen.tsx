/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';


type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUpScreen: React.FC<Props>= ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Handle sign up
  const handleSignUp = () =>{
      if (email && password){
        try{
            createUserWithEmailAndPassword(getAuth(),email,password);
            Alert.alert('Successfully registered');
        }catch{
          console.log('Error', Error);
        }
      }
  };

  //Handle back button press
  const handleBack = () =>{
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-left" size={30} color="#fff"/>
      </TouchableOpacity>

      {/* Headline */}
      <View style={{ marginTop:20, marginBottom:10 }}>
        <Text style={styles.Headline}> Create Account</Text>
      </View>

      <Text style={styles.instructText}> Create a new account to get started.</Text>

    {/* Name Input */}
    <View style={styles.inputRow}>
      <Icon name="account" size={20} color="#666" style={styles.inputIcon}/>
      <TextInput 
      style={[styles.input, styles.inputWithIcon]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
    </View>

    {/* Email Input */}
      <View style={styles.inputRow}>
        <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, styles.inputWithIcon]}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>


      {/* Password Input */}
      <View style={styles.inputRow}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, styles.inputWithIcon]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Sign Up Button */}
      <View style={styles.button}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Text */}
      <View style={styles.bottomText}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separatorContainer}>
      <View style={styles.line} />
      </View>

      {/* Social Media Sign In */}
      <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:5,
              marginBottom:20,
          }
          }>
              <Text style={{fontSize:14,}}> Sign in with</Text>
      
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

    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 70,
    alignItems: 'center',
  },
  Headline: { fontSize: 24, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 13,
    width: '100%',
    marginTop: 6,
    minHeight: 50,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1d60e5ff',
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom:10,
  },
  inputIcon: {
    position: 'absolute',
    left:12,
    top: 14,
    zIndex: 2,
  },
  inputWithIcon: { paddingLeft: 40 },
  instructText: { fontSize: 14, color: '#424141ff', marginBottom: 30},
  bottomText:{ flexDirection: 'row',justifyContent:'center', marginTop:20},
  signIn: {color: '#1976D2', fontWeight:'bold',marginLeft: 5,},
  backButton:{position:'absolute', left:20,  backgroundColor:'#1d60e5ff',borderRadius:18, padding:6},
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#cbc1c1ff',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 29,
    width: '100%',
    paddingHorizontal: 10,
  },
   separatorText: {
    marginHorizontal: 8,
    color: '#666',
    fontSize: 14,
  },
});
