//import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MainTabsParamList } from '../navigation/MainTabs'; // adjust import
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';


type DashboardProps = BottomTabScreenProps<MainTabsParamList, 'Profile'>;

const ProfileScreen: React.FC<DashboardProps> = () => {
  const user = auth().currentUser;
  //Handle logout
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out');
    } catch (error: any) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Profile</Text>

      <View style={{ flexDirection: 'row', padding: 16 }}>
        {/*Profile photo*/}
        <View style={styles.image}>
          <Image
            source={{
              uri: 'https://cdn-ildmcgn.nitrocdn.com/okwhMcaXHzSKfBdDCZKzgxOOHItdZptk/assets/images/optimized/rev-f4009c2/oslofreedomforum.com/wp-content/uploads/2024/01/Speaker-Anwar-Ibrahim-V1.png',
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '500',
              color:'#fff',
              marginTop: 30,
              marginLeft: 10,
            }}
          >
            {user?.displayName ?? 'Loading ..'}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: '#655F5F',
              marginTop: 5,
              marginLeft: 10,
            }}
          >
            {user?.email}
          </Text>
        </View>
      </View>
      <View style={styles.topRoundedCard}>
        <TouchableOpacity style={styles.notification}>
          <Text style={{textAlign:'center'}}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.about}>
          <Text style={{textAlign:'center'}}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.themeStyle}>
          <Text style={{textAlign:'center'}}>Dark Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logOut} onPress={handleLogout}>
          <Text style={{textAlign:'center'}}>Log Out</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, backgroundColor:'#0F0F28' },
  text: { fontSize: 24, fontWeight: 'bold', textAlign: 'center',color:'#fff' },
  button: {
    marginVertical: 8,
    width: '80%',
    alignSelf: 'center',
  },
  image: {
    marginTop: 20,
    width: 110,
    height: 110,
    borderRadius: 70,
    backgroundColor: '#bdefff',
    marginLeft: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0096c7',
  },
  topRoundedCard: {
    backgroundColor: '#fff',
    marginTop: 150,
    height: 460,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    padding:16,
    justifyContent:'center',
  },
  notification:{
    backgroundColor: '#f2eef9ff',
    paddingVertical: 20,
    borderRadius: 8,
    marginTop: 28,
    shadowColor:'#0c0808ff',
    shadowOpacity:0.8,
  },
  about:{
    backgroundColor:'#f2eef9ff',
    paddingVertical:20,
    borderRadius:8,
    marginTop:20,
    shadowColor:'#0c0808ff',
    shadowOpacity:0.8,
  },
  themeStyle:{
    backgroundColor:'#f2eef9ff',
    paddingVertical:20,
    borderRadius:8,
    marginTop:20,
    shadowColor:'#0c0808ff',
    shadowOpacity:0.8,
  },
  logOut:{
    backgroundColor:'#f2eef9ff',
    paddingVertical:20,
    borderRadius:8,
    marginTop:20,
    shadowColor:'#0c0808ff',
    shadowOpacity:0.8,
  },
});
