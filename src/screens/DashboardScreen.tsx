/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { MainTabsParamList } from '../navigation/MainTabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store/store';
import { useSelector } from 'react-redux';

type DashboardProps = BottomTabScreenProps<MainTabsParamList, 'Dashboard'>;

const DashboardScreen: React.FC<DashboardProps> = () => {
  const navigation = useNavigation<any>();

  const tickets = useSelector((state: RootState) => state.tickets.tickets);

  const renderTicket = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TicketDetails', { ticket: item })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>ID: {item.id}</Text>
        {/*Status & Status Badge*/}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'Open'
                  ? '#7133ecff'
                  : item.status === 'In-Progress'
                  ? '#cccc26ff'
                  : '#30d96bff',
            },
          ]}
        >
          <Text style={styles.ticketStatus}>{item.status}</Text>
        </View>
      </View>

      {/*Ticket title*/}
      <Text style={styles.ticketTitle}>{item.title}</Text>

      {/*Category */}
      <Text>Category: {item.category || 'Null'}</Text>

      {/*Assigned to*/}
      <Text>Assigned: {item.assigned || 'Unassigned'}</Text>

      {/*Priority & Time*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        <Text>Created on: {new Date(item.createdAt).toLocaleString()}</Text>
        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                item.priority === 'Low'
                  ? '#388E3C'
                  : item.priority === 'Medium'
                  ? '#FBC02D'
                  : '#D32F2F',
            },
          ]}
        >
          <Text style={styles.priorityStatus}>{item.priority}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/*Screen Title*/}
      <Text style={styles.text}> Dashboard</Text>
      {/*Welcome Text*/}
      <Text style={styles.welcome}>Welcome Back, James!</Text>

      {/* Filter Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        {/* Open Ticket */}
        <View style={[styles.filterButton, { backgroundColor: '#7133ecff' }]}>
          <Text style={styles.filterLabel}>Open</Text>
          <Text style={styles.filterCount}>
            {tickets.filter((t: any) => t.status === 'Open').length}
          </Text>
        </View>

        {/* In-Progress Ticket */}
        <View style={[styles.filterButton, { backgroundColor: '#cccc26ff' }]}>
          <Text style={styles.filterLabel}>In-Progress</Text>
          <Text style={styles.filterCount}>
            {tickets.filter((t: any) => t.status === 'In-Progress').length}
          </Text>
        </View>

        {/* Closed Ticket */}
        <View style={[styles.filterButton, { backgroundColor: '#30d96bff' }]}>
          <Text style={styles.filterLabel}>Closed</Text>
          <Text style={styles.filterCount}>
            {tickets.filter((t: any) => t.status === 'Closed').length}
          </Text>
        </View>
      </View>

      {/*To do: add filter beside activity title*/}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1976D2',
          textAlign: 'left',
          marginBottom: 10,
          marginTop: 18,
        }}
      >
        Recent Activity
      </Text>

      {/*Ticket lists*/}
      <FlatList
        data={tickets}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTicket}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/*Floating Action Button for filtering tickets */}

        
    </View>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 6,
    color: '#1976D2',
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
    width: '80%',
  },
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#63636333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 0.7,
    borderColor: '#e0e0e0',
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 6,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#1976D2',
    marginBottom: 10,
  },
  ticketStatus: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  filterButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  filterCount: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },
  statusBadge: {
    borderRadius: 13,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  priorityBadge: {
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  priorityStatus: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'auto',
    color: '#fff',
  },
});
