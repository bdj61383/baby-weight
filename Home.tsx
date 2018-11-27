import { QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore-types';
import React from 'react';
import { Button, Image, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { withFirebase } from 'react-redux-firebase';
import { db } from './firebase';

interface Props {
  navigation: NavigationScreenProp<State> 
}

interface State {
  first_name: string,
  last_name: string,
  due_date: any
}

class Home extends React.Component<Props, State> {
  static navigationOptions = {    
    drawerIcon: (tintColor:object) => (
      <Image
        source={require('./assets/images/home-icon.png')}
        style={[styles.icon, {tintColor: tintColor.tintColor}]} // TODO: figure out why this is complaining about its type
      />
    ),
    drawerLabel: 'Home',
  };

  readonly state = {first_name: '', last_name: '', due_date: null};

  componentDidMount() {
    db.collection("users").get().then((querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            const user = doc.data();
            this.setState({
              due_date: user.due_date,
              first_name: user.first_name, 
              last_name: user.last_name
            })
        });
    });
  }

  handleButtonPress = (event: NativeSyntheticEvent<NativeTouchEvent>) =>
    this.props.firebase.logout();

  handleDrawerOpen = (event: NativeSyntheticEvent<NativeTouchEvent>) =>
    this.props.navigation.openDrawer()

  // handleTextSubmit = (text:string):void => this.setState({name: text});

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleDrawerOpen}>
          <Image source={require('./assets/images/menu-icon.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text>Welcome to the app {this.state.first_name} {this.state.last_name}</Text>
        {/* <Text>Your babby is due on {this.state.due_date}</Text> */}
      </View>
      // <View style={styles.root}>
      //   <View style={styles.container}>
      //     <Text>Enter Your Name</Text>
      //     <TextInput style={styles.textInput} onChangeText={this.handleTextSubmit} />
      //   </View>
      //   <View style={styles.otherContainer}>
      //     { this.state.name !== '' ?
      //       <Text>Welcome to the app, {this.state.name}!</Text> : null
      //     }
      //   </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#2ab7ca',
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  icon: {
    height: 24,
    width: 24,    
  },
  menuIcon: {
    height: 30,
    margin: 15,
    width: 30,    
  },
  otherContainer: {
    // flex: 2,
    alignItems: 'center',
    backgroundColor: '#3cd8fa',
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  root: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInput: {
    backgroundColor: '#fff',
    flex: 1,
    height: 40,
    width: 75,    
  }
});

export const HomeContainer = withFirebase(Home);
