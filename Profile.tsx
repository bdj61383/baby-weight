import React from 'react';
import { Image, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withFirebase } from 'react-redux-firebase';

// interface Props {
  
// }

// interface State {

// }

class Profile extends React.Component<{}, {}> {

  static navigationOptions = {    
    drawerIcon: (tintColor:object) => (
      <Image
        source={require('./assets/images/profile-icon.png')}
        style={[styles.icon, {tintColor: tintColor.tintColor}]} // TODO: figure out why this is complaining about its type
      />
    ),
    drawerLabel: 'Profile',
  };

  handleDrawerOpen = (event: NativeSyntheticEvent<NativeTouchEvent>) =>
    this.props.navigation.openDrawer()

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.handleDrawerOpen}>
          <Image source={require('./assets/images/menu-icon.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <View>
          <Text>This is your profile screen.  Here you will input your height, due date and your weight at the beginning of your pregnancy (it's okay to estimate!).</Text>
            {/* TODO: Add form. */}
        </View>
      </React.Fragment>
    );
  }
}

export const ProfileContainer = withFirebase(Profile);

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,    
  },
  menuIcon: {
    height: 30,
    margin: 15,
    width: 30,    
  },
});
