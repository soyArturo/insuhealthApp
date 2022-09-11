/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import axios from 'axios';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name, value) => {
    console.log(name, value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    axios
      .post('http://34.197.229.133/users/auth/login/', userData)
      .then(res => {
        navigation.navigate('Home');
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid Credentials',
        });
      });
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Toast />
      <View style={{paddingHorizontal: 25}}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '900',
            color: '#333',
            marginBottom: 30,
          }}>
          InsuHealth
        </Text>

        <InputField
          placeholder={'Enter username'}
          icon={
            <MaterialIcons
              name="account-circle"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          name="username"
          onChangeText={text => handleChange('username', text)}
          value={userData.username}
          keyboardType="email-address"
        />

        <InputField
          placeholder={'Enter password'}
          icon={
            <MaterialIcons
              name="lock"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          name="password"
          onChangeText={text => handleChange('password', text)}
          inputType="password"
        />

        <CustomButton
          label={'Login'}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#3b5998',
              alignItems: 'center',
              width: '100%',
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <MaterialIcons name="facebook" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
