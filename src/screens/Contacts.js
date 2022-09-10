/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Contacts = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#B0D5AF', '#C4EDC3', '#FFF']}
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
                color: '#000',
              }}>
              Contacts
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="plus" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
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
});

export default Contacts;
