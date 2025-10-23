import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

type TicketDetailsRouteProp = RouteProp<RootStackParamList, 'TicketDetails'>;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TicketDetails'
>;

type Props = { route: TicketDetailsRouteProp };

const TicketDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();
  const { ticket } = route.params;

  const [status, setStatus] = useState(ticket.status || 'open');
  const [open, setOpen] = useState(false);

  const statusOptions = [
    { label: 'Open', value: 'open' },
    { label: 'In Progress', value: 'in_progree' },
    { label: 'Closed', value: 'closed' },
  ];

  //Date format
  const formatDateTime = (isoString: string) => {
    if (!isoString) return 'Unknown date';
    return new Intl.DateTimeFormat('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoString));
  };

  const handleSave = () => {
    Alert.alert('Status Updated', `Ticket marked as ${status}`);
    //Api call for update
    navigation.goBack();
  };

  const timeSince = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 6000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''}ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.meta}>
        Created on {formatDateTime(ticket?.createdAt || '')} (
        {timeSince(ticket?.createdAt || '')})
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{ticket.category}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Priority:</Text>
        <Text style={styles.value}>{ticket.description}</Text>
      </View>

      {ticket.attachment && (
        <View style={styles.section}>
          <Text style={styles.label}>Attachment:</Text>
          <Image
            source={{ uri: ticket.attachment }}
            style={styles.attachment}
            resizeMode="cover"
          />
        </View>
      )}

      {/*Status dropdown*/}
      <View style={styles.section}>
        <Text style={styles.label}>Ticket Status:</Text>
        <DropDownPicker
          open={open}
          value={status}
          items={statusOptions}
          setOpen={setOpen}
          setValue={setStatus}
          placeholder="Select Status"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      {/*Change status button*/}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TicketDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  meta: {
    fontSize: 13,
    color: '#888',
    marginBottom: 15,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  attachment: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#7133ec',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 28,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
