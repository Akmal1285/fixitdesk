import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MainTabsParamList } from '../navigation/MainTabs'; // adjust import
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type DashboardProps = BottomTabScreenProps<MainTabsParamList, 'Profile'>;

interface ProfileData {
  name: string;
  shopName: string;
  phone: string;
  email: string;
  address: string;
  photo?: string | null;
}




const ProfileScreen:React.FC<DashboardProps> = ({navigation}) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    shopName: '',
    phone: '',
    email: '',
    address: '',
    photo: null,
  });
  
  //Load profile fromm asynchstorage
  useEffect(() => {
    const loadProfile = async () =>{
      const saved = await AsynchStorage.getItem('technicianProfile');
      if (saved) setProfile(JSON.parse(saved));
    };
    loadProfile();
  }, []);

  


  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        Back to Dashboard
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  button: {
    marginVertical: 8, width: '80%',
  },
});
