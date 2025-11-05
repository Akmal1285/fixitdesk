/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { updateTicketStatus } from '../redux/slice/ticketSlice';

type TicketDetailsRouteProp = RouteProp<RootStackParamList, 'TicketDetails'>;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TicketDetails'
>;

type Props = { route: TicketDetailsRouteProp };

const TicketDetailsScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const ticket = route.params?.ticket;

  // If ticket is missing, inform the user and go back to previous screen
  useEffect(() => {
    if (!ticket) {
      Alert.alert('Error', 'Ticket data is missing', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [ticket, navigation]);

  if (!ticket) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ticket not found</Text>
      </View>
    );
  }

  const [status, setStatus] = useState(
    ticket?.status
      ? String(ticket.status).toLowerCase().replace(/\s+/g, '_')
      : 'open',
  );
  const [open, setOpen] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const statusOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In-Progress' },
    { label: 'Closed', value: 'Closed' },
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
    // Dispatch action to update ticket status
    if (ticket?.id){
      dispatch(
        updateTicketStatus({
          id: ticket.id,
          status: status as 'Open' | 'In-progress' | 'Closed',
        }),
      );
    }
    Alert.alert('Status Updated', `Ticket marked as ${status}`);
    navigation.goBack();
  };

  const timeSince = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''}ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
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
        <Text style={styles.value}>{ticket.priority}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{ticket.description}</Text>
      </View>

      {ticket.attachments && ticket.attachments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Attachment:</Text>
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image
              source={{ uri: ticket.attachments[0] }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <Modal
            visible={isImageModalVisible}
            transparent={true}
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <TouchableOpacity
                style={{ position: 'absolute', top: 30, right: 20, zIndex: 2 }}
                onPress={() => setImageModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: ticket.attachments[0] }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            </View>
          </Modal>
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
  //container: { flex: 1 , justifyContent: 'center', alignItems: 'flex-start'},
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
    width: '100%', // make sections full width inside centered container
    alignItems: 'flex-start',
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
    height: 300,
    borderRadius: 8,
    marginTop: 8,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#eee',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullImage: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
