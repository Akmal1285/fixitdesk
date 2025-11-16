import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
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
import { validateEmail } from '../utils';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Reset'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  //Handle reset button
  const handleReset = async () => {
    if (!email) return;

    const eErr = validateEmail(email);
    setEmailError(eErr);
    if (eErr) return;

    try {
    await sendPasswordResetEmail(getAuth(), email);
      Alert.alert(
      "Password Reset Email Sent",
      "Please check your inbox.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        }
      ]
    );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/*Logo */}
      <Image
        source={require('../assets/LockLogo.png')}
        resizeMode="contain"
        style={styles.logo}
      />

      {/*Heading*/}
      <Text style={styles.HeadingText}>Forgot your password?</Text>

      {/*Instruction Text*/}
      <Text style={styles.instructText}>
        Enter your email address to reset password
      </Text>

      {/*Email Input*/}
      <View style={styles.inputRow}>
        <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
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

      {/*Reset Button*/}
      <TouchableOpacity
        style={[styles.button, validateEmail(email) && styles.buttonDisabled]}
        activeOpacity={0.7}
        onPress={handleReset}
        disabled={
                    !!(validateEmail(email))
                  }
      >
        <Text style={[styles.buttonText]}>Reset Password</Text>
      </TouchableOpacity>

      {/*Bottom Text*/}
      <View style={styles.bottomText}>
        <Text> Remember your password?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Go back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  HeadingText: {
    fontWeight: '700',
    fontSize: 30,
    alignSelf: 'center',
    color: '#1C457A',
  },
  instructText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#212121',
    marginTop: 8,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: 45,
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
  loginText: { color: '#1976D2', marginLeft: 5 },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 10,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  bottomText: { flexDirection: 'row', justifyContent: 'center' },
  buttonDisabled: {
    backgroundColor: '#97b8df',
  },
});
