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
import {FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen({navigation}) {
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
              Hello John Doe
            </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <ImageBackground
                source={require('../assets/images/user-profile.jpg')}
                style={{width: 35, height: 35}}
                imageStyle={{borderRadius: 25}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 10}}>
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
                fontSize: 14,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              You are healthy
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </SafeAreaView>
  );
}

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
    bottom: 0,
    backgroundColor: '#FFA500',
  },
});
