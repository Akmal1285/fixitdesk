/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { validateEmail } from '../utils';
import { validatePassword } from '../utils';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);
        // Validate email and password
        const eErr = validateEmail(email);
        const pErr = validatePassword(password);
        setEmailError(eErr);
        setPasswordError(pErr);

        if (eErr || pErr) return;

        // Await the Firebase login
        const userCredential = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password,
        );

        // To do: Access user info
        console.log('User signed in:', userCredential.user);
      } catch (error: any) {
        setLoading(false);
        console.error('Login error:', error.message);
        Alert.alert('Login Error : Wrong Credentials');
      }
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        {/* Logo and Headline */}
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.greeting}>Welcome Back</Text>
        <Text style={styles.welcome}>Sign in to continue</Text>

        {/* Email Input*/}
        <View style={styles.inputRow}>
          <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            autoCapitalize='none'
            autoCorrect={false}
            editable={true}
            onChangeText={t => {
              setEmail(t);
              if (emailError) setEmailError(null);
            }}
            onBlur={() => setEmailError(validateEmail(email))}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Input */}
        <View style={styles.inputRow}>
          <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={t => {
              setPasword(t);
              if (passwordError) setPasswordError(null);
            }}
            onBlur={() => setPasswordError(validatePassword(password))}
            secureTextEntry ={!showPassword}
          />
          {/*Show or Hide Password Entry*/}
          <TouchableOpacity onPress={() => setShowPassword(s => !s)}
          style={styles.rightIconTouchable}
          activeOpacity={0.7}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color='#666'/>
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* Forgot Password Link */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/*Sign In Button */}
        <TouchableOpacity
          style={[
            styles.button,
            (validateEmail(email) || validatePassword(password)) &&
              styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={
            !!(validateEmail(email) || validatePassword(password) || loading)
          }
        >
          {loading ? (
            <ActivityIndicator color="#f4fbf8ff" />
          ) : (
            <Text style={styles.buttonText}> Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Bottom Text */}
        <View style={styles.bottomText}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.line}>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>OR</Text>
          </View>
        </View>

        {/* Social Media Sign In */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 6,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 14 }}>Sign in with</Text>

          <Image
            source={require('../assets/google.png')}
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              resizeMode: 'contain',
            }}
          />
          <Image
            source={require('../assets/apple.png')}
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              resizeMode: 'contain',
            }}
          />
          <Image
            source={require('../assets/linkedin.png')}
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 32,
    color: '#212121',
  },
  greeting: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1C457A',
  },
  input: {
    flex: 1,
     alignSelf: 'stretch',
    width: '100%',
    height: 45,
  },
  forgot: {
    textAlign: 'right',
    color: '#1976D2',
    marginBottom: 24,
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor: '#1976D2',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    color: '#1976D2',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  }, 
  inputIcon: {
    marginRight: 8,
  },
  errorText: {
    color: '#d32f2f',
    marginTop: 4,
    marginBottom: 6,
    marginLeft: 12,
    fontSize: 13,
  },
  buttonDisabled: {
    backgroundColor: '#97b8df',
  },
  rightIconTouchable:{
    position: 'absolute',
    right: 12,
    top: 11,
    zIndex: 2,
  },
});
