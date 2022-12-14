/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(
        'http://34.197.229.133/users/patient/?cognito_id=324faef6-956f-4b9d-b2d2-9fcacb93e8b9',
      )
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendSMS = is_ambulance => {
    const sms = is_ambulance
      ? `Hi, an ambulance is on its way for ${users[0].name}.\n\n Please contact immediately.`
      : `Hi, your relative ${users[0].name} has raised a gluocose alert and has contacted a doctor.\n\n Please contact immediately.`;
    axios
      .post('http://34.197.229.133/users/auth/sendmultiplesns/', {
        message: sms,
        cognito_id: '6651e895-7272-4042-a9c6-98eca6035610',
      })
      .then(res => {
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAmbulance = () => {
    sendSMS(true);
    return Linking.openURL('tel:6647451762');
  };

  const fetchContacts = () => {
    axios
      .get('http://34.197.229.133/users/emergencycontact/')
      .then(res => {
        console.log(res.data);
        setContacts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
    fetchContacts();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#2d62bc', '#4271c2', '#FFF']}
        style={styles.linearGradient}>
        <ScrollView style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto-Medium',
                fontWeight: '900',
                color: '#fff',
              }}>
              Contacts
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="plus" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#fff',
                marginBottom: 5,
              }}>
              Emergency Contacts
            </Text>
            {contacts &&
              contacts.length > 0 &&
              contacts.map(contact => {
                return (
                  <Card key={contact} style={{marginBottom: 5}}>
                    <Card.Title
                      title={`${contact.name}(${contact._type_contact.name})`}
                      subtitle={contact.phone_number}
                    />
                  </Card>
                );
              })}
          </View>
        </ScrollView>
      </LinearGradient>
      <FAB
        icon="ambulance"
        color="#fff"
        style={styles.fab}
        onPress={() => getAmbulance()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 30,
    backgroundColor: '#db493c',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
});

export default Contacts;
