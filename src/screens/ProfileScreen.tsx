//import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MainTabsParamList } from '../navigation/MainTabs'; // adjust import
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { getAuth } from '@react-native-firebase/auth';

type DashboardProps = BottomTabScreenProps<MainTabsParamList, 'Profile'>;

const ProfileScreen: React.FC<DashboardProps> = () => {
  //Handle logout
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      console.log('User signed out');
    } catch (error: any) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>

      <Button mode="outlined" style={styles.button} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  button: {
    marginVertical: 8,
    width: '80%',
  },
});
