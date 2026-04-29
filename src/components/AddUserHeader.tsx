import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { addUserRequest } from '../store/slices/userSlice';

const AddUserHeader = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (name && email) {
      // Dispatch the request with the payload
      dispatch(addUserRequest({ name, email, company: { name: 'New Corp' } }));
      setName('');
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <Button title="Add Employee" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#eee' },
  input: { backgroundColor: '#fff', marginBottom: 10, padding: 10, borderRadius: 5 }
});

export default AddUserHeader;