/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {FAB, Card, Modal, Portal, Provider, Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [health_status, setHealthStatus] = useState(1);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const buttonStyle = {
    backgroundColor: health_status === 1 ? '#fff' : '#f00',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
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

  const handleContact = () => {
    const doctor_number = physicians[0].phone_number;
    const message = `Hello Dr. ${physicians[0].name}, I am ${users[0].name} with date of birth ${users[0].date_of_birth} and I am diying.\n\n${users[0].historical_record_url}`;
    sendSMS(false);
    return Linking.openURL(`https://wa.me/52${doctor_number}?text=${message}`);
  };

  const getAmbulance = () => {
    sendSMS(true);
    return Linking.openURL('tel:6647451762');
  };

  const modalHealthyText = 'Are you sure do you want to contact the doctor?';

  const sethealth = status => {
    if (status === 1) {
      setHealthStatus(2);
    }
    if (status === 2) {
      setHealthStatus(1);
    }
  };

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

  const fecthPhysicians = () => {
    axios
      .get('http://34.197.229.133/users/physician/')
      .then(res => {
        setPhysicians(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
    fecthPhysicians();
  }, []);
  return (
    <Provider>
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
              {users && users.length > 0 && (
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto-Medium',
                    fontWeight: '900',
                    color: '#fff',
                  }}>
                  Hello {users[0].name}
                </Text>
              )}
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <ImageBackground
                  source={require('../assets/images/user-profile.jpg')}
                  style={{width: 35, height: 35}}
                  imageStyle={{borderRadius: 25}}
                />
              </TouchableOpacity>
            </View>
            <Card style={{marginBottom: 10, backgroundColor: '#fff'}}>
              <Card.Content>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Medium',
                      color: '#000',
                    }}>
                    Recent Data:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto-Medium',
                      color: '#000',
                    }}>
                    9/9/2022 10:00AM 40g/ml
                  </Text>
                </View>
              </Card.Content>
            </Card>
            <Card
              style={{marginBottom: 10, backgroundColor: '#fff'}}
              onLongPress={() => sethealth(health_status)}>
              <Card.Content>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Medium',
                      color: '#000',
                    }}>
                    Status:
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      fontFamily: 'Roboto-Medium',
                      color: health_status === 1 ? '#30e641' : '#f00',
                    }}>
                    {health_status === 1
                      ? 'Everything is fine'
                      : 'In Risk, Contact a Doctor'}
                  </Text>
                </View>
              </Card.Content>
            </Card>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={buttonStyle}
                onPress={health_status === 1 ? showModal : handleContact}>
                <ImageBackground
                  source={require('../assets/images/doctor-call.png')}
                  style={{width: 50, height: 50}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
        <FAB
          icon="ambulance"
          color="#fff"
          style={styles.fab}
          onPress={() => getAmbulance()}
        />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  color: '#000',
                }}>
                {modalHealthyText}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Roboto-Medium',
                  color: '#000',
                }}>
                (If you click yes, you will be redirected to whatsapp with an
                automated message to send to the doctor)
              </Text>
              <Button
                mode="text"
                textColor="#2d62bc"
                onPress={() => {
                  const doctor_number = physicians[0].phone_number;
                  const message = `Hello Dr. ${physicians[0].name}, I am ${users[0].name} with date of birth ${users[0].date_of_birth} and I am having a problem with my blood sugar level. Please contact me as soon as possible.\n\n${users[0].historical_record_url}`;
                  Linking.openURL(
                    `https://wa.me/52${doctor_number}?text=${message}`,
                  );
                }}>
                Yes
              </Button>
              <Button
                mode="text"
                textColor="#2d62bc"
                onPress={() => {
                  handleContact();
                }}>
                Yes, notifiy my emergency contacts
              </Button>
              <Button mode="text" textColor="#FF0000" onPress={hideModal}>
                No
              </Button>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
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

export default HomeScreen;
