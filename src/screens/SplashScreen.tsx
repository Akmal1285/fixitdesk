import { Animated,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';


type Props = NativeStackScreenProps<RootStackParamList,'Splash'>

const SplashScreen :React.FC <Props> = ({navigation}) => {

    //Animation
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim,{
            toValue: 1,
            duration: 2000, //2 seconds
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    

  return (
    <View style={styles.container}>
        
        <Animated.Image 
        source={require('../assets/Logo.png')}
        style={[styles.logoText,{opacity: fadeAnim}]}
        resizeMode='contain'
        />
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../assets/SplashLogo.png')}
          style={[styles.logo,{opacity: fadeAnim}]}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.text}>Your ticket to a solution</Text>

      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#a3e7f5ff'
  },
  logo: {
    width: 380,
    height: 486,
    alignSelf: 'center',
    marginTop: 90,
    borderRadius: 18,
  },
  logoContainer: {
    margin: 80,
    marginBottom:15,
  },
  logoText: { position:'absolute', zIndex:1, width:200, height:200},
  button: {
    marginTop: 30,
    padding: 12,
    paddingHorizontal: 100,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  text: { fontSize: 20, fontWeight:'700', color:"#166d78ff",marginBottom:10},
  buttonText: {color:'#0f8878ff', fontWeight:'bold', fontSize:16},
});
