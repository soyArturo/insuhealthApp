/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Linking,
  ImageBackground,
} from 'react-native';
import {FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const Graphs = () => {
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

  useEffect(() => {
    fetchUsers();
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
              Charts
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <ImageBackground
              source={require('../assets/images/charts.jpeg')}
              style={{width: '100%', height: 250, marginBottom: 20}}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto-Medium',
                color: '#fff',
              }}>
              Your gluocose is usually high on Wendsday and low on Saturday and
              daily its high at 4:00 AM and low at 12:00 PM.
            </Text>
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
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 30,
    backgroundColor: '#db493c',
  },
});

export default Graphs;
