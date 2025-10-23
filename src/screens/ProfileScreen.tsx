import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MainTabsParamList } from '../navigation/MainTabs'; // adjust import
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type DashboardProps = BottomTabScreenProps<MainTabsParamList, 'Profile'>;


const ProfileScreen:React.FC<DashboardProps> = ({navigation}) => {
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
