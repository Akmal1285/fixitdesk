/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { MainTabsParamList } from '../navigation/MainTabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera } from 'lucide-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Validation schema
const ticketSchema = yup.object({
  title: yup.string().required('Title is required').default(''),
  category: yup.string().required('Category is required').default(''),
  description: yup.string().required('Description is required').default(''),
  priority: yup.string().required('Priority is required').default(''),
});

export type TicketFormValues = {
  title: string;
  category: string;
  description: string;
  priority: string;
  attachment?: string;
  createdAt?: string;
  status?: 'open' | 'in_progress' | 'closed';
};

type DashboardProps = BottomTabScreenProps<MainTabsParamList, 'Tickets'>;

const CreateTicketScreen: React.FC<DashboardProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    resolver: yupResolver(ticketSchema),
  });

  const [attachmentUri, setAttachmentUri] = useState<string | null>(null);

  const pickAttachment = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setAttachmentUri(result.assets[0].uri || null);
    }
  };

  const onSubmit = (data: TicketFormValues) => {
    const ticketWithTime ={
      ...data,
      createdAt: new Date().toISOString(),
    };

    console.log('New Ticket', ticketWithTime);
    Alert.alert('Success', 'Ticket created successfully!');
    reset(ticketSchema.cast({}));
    setAttachmentUri(null);
    navigation.navigate('Dashboard');
  };

  //Dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  const [categories, setCategories] = useState([
    { label: 'Network', value: 'network' },
    { label: 'Software', value: 'software' },
    { label: 'Hardware', value: 'hardware' },
  ]);

  const [priorities, setPriorities] = useState([
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      extraScrollHeight={20}
      enableOnAndroid
    >
      <Text style={styles.text}>Create New Ticket</Text>
      <Text style={{ textAlign: 'center', color: '#686464ff' }}>
        Fill out the details below
      </Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.title && styles.errorInput]}
            placeholder="Enter ticket title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <View style={{ zIndex: 3000 }}>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              open={categoryOpen}
              value={value}
              items={categories}
              setOpen={setCategoryOpen}
              setValue={onChange}
              setItems={setCategories}
              placeholder="Select category"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={3000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
              containerStyle={{
                marginBottom: categoryOpen ? 200 : 10,
              }}
            />
          )}
        />
      </View>
      {errors.category && (
        <Text style={styles.error}>{errors.category.message}</Text>
      )}

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>
      <View style={{ zIndex: 2000 }}>
        <Controller
          control={control}
          name="priority"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              open={priorityOpen}
              value={value}
              items={priorities}
              setOpen={setPriorityOpen}
              setValue={onChange}
              setItems={setPriorities}
              placeholder="Select priority"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={2000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
              containerStyle={{
                marginBottom: priorityOpen ? 200 : 10,
              }}
            />
          )}
        />
      </View>
      {errors.priority && (
        <Text style={styles.error}>{errors.priority.message}</Text>
      )}

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.textArea, errors.description && styles.errorInput]}
            placeholder="Describe the issue ..."
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
          />
        )}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      {/* Attachment */}
      <Text style={styles.label}>Attachment (Image only)</Text>
      <TouchableOpacity style={styles.attachButton} onPress={pickAttachment}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Camera size={20} color="#7133ec" />
          <Text style={styles.attachText}>Add Photo</Text>
        </View>
      </TouchableOpacity>

      {/* Preview */}
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        {attachmentUri ? (
          <>
            <Image source={{ uri: attachmentUri }} style={styles.previewImage} />
            <Text style={{ fontSize: 12, color: '#555' }}>Attached Image</Text>
          </>
        ) : (
          <View style={styles.addPhotoContainer}>
            <Camera size={28} color="#777" />
            <Text style={{ color: '#777', marginTop: 5, textAlign: 'center' }}>
              No image selected
            </Text>
          </View>
        )}
      </View>

      {attachmentUri && (
        <TouchableOpacity onPress={() => setAttachmentUri(null)}>
          <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            Remove Image
          </Text>
        </TouchableOpacity>
      )}

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit Ticket</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default CreateTicketScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 50 },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#1976D2',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 10,
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
  attachButton: {
    borderWidth: 1,
    borderColor: '#7133ec',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f3f0ff',
  },
  attachText: { color: '#7133ec', fontWeight: '500' },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
  addPhotoContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    marginTop: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
});
