import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={{ height: 50, marginTop: 20 }}>
        <Text style={styles.Headline}> SignUp Screen</Text>
      </View>

      <View style={styles.inputRow}>
        <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, styles.inputWithIcon]}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputRow}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, styles.inputWithIcon]}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => handleSignUp(email, password)}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
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
    paddingHorizontal: 70,
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
});
