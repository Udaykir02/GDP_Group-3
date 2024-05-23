import { argonTheme } from '../constants';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../reducers/users/slice';
const { width, height } = Dimensions.get('screen');
// Define the User interface
interface User {
  userId: string;
  username: string;
  fname: string;
  lname: string;
  emailVerified: boolean;
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

const EditUserProfile = () => {
  const userData = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [user, setUser] = useState<User | null>(userData ? userData : null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Handle updating user information
  const handleUpdate = () => {
    fetch(`${process.env.BASE_URL}/api/updateUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          dispatch(updateUser(user));
          Alert.alert('Success', 'User information updated successfully');
        } else {
          Alert.alert('Error', 'Failed to update user information');
        }
      })
      .catch(error => {
        console.error('Error updating user information:', error);
        Alert.alert('Error', 'Failed to update user information');
      });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>User not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={user.fname}
        onChangeText={text => setUser({ ...user, fname: text })}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={user.lname}
        onChangeText={text => setUser({ ...user, lname: text })}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={user?.email}
        onChangeText={text => setUser({ ...user, username: text })}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={user.address.street1}
        onChangeText={text => setUser({ ...user, address: { ...user.address, street1: text } })}
        placeholder="Street 1"
      />
      <TextInput
        style={styles.input}
        value={user.address.street2}
        onChangeText={text => setUser({ ...user, address: { ...user.address, street2: text } })}
        placeholder="Street 2"
      />
      <TextInput
        style={styles.input}
        value={user.address.city}
        onChangeText={text => setUser({ ...user, address: { ...user.address, city: text } })}
        placeholder="City"
      />
      <TextInput
        style={styles.input}
        value={user.address.state}
        onChangeText={text => setUser({ ...user, address: { ...user.address, state: text } })}
        placeholder="State"
      />
      <TextInput
        style={styles.input}
        value={user.address.country}
        onChangeText={text => setUser({ ...user, address: { ...user.address, country: text } })}
        placeholder="Country"
      />
      <TextInput
        style={styles.input}
        value={user.address.zip}
        onChangeText={text => setUser({ ...user, address: { ...user.address, zip: text } })}
        placeholder="Zip Code"
      />
      <Button title="Update Profile" onPress={handleUpdate} />
      <View style={[styles.shadow, { marginBottom: 10 }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.optionsButton} onPress={handleUpdate} testID={"cart_pay_buttoon_testid"}>
            <View style={{ width: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 18 }}>
                  Save Changes
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  optionsButton: {
    width: "92%",
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: argonTheme.COLORS.ERROR,
    borderRadius: 8,
    justifyContent: 'center'
  }, shadow: {
    position: 'absolute',
    bottom: 5,
    flex: 0.10,
    flexDirection: 'row',
    width: width,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 8
  },
});

export default EditUserProfile;
