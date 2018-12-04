import { Button, DatePicker, Icon, Picker } from 'native-base';
import React from 'react';
import { Image, NativeSyntheticEvent, NativeTouchEvent, PickerIOS, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { updateUserAction, UserAction } from './actions';
import { AppState, UserProfile } from './interfaces';

interface Props {
  dispatch: (a: UserAction) => void,
  navigation: NavigationScreenProp<{}>,
  onUserLoaded: any,
  userProfile: UserProfile,
}

interface State {
  displayName: string | null,
  dueDate: Date | null,
  height: number | null,
  initialWeight: number | null
}

// Todo: Fix this bogus interface.  Where is tint-color even coming from?
interface TintColor {
  tintColor: string
}

class Profile extends React.Component<Props, State> {

  static navigationOptions = {    
    drawerIcon: (tintColor: TintColor) => (
      <Image
        source={require('./assets/images/profile-icon.png')}
        style={[styles.icon, {tintColor: tintColor.tintColor}]}
      />
    ),
    drawerLabel: 'Profile',
  };

  readonly state = {
    displayName: this.props.userProfile.displayName,
    dueDate: this.props.userProfile.dueDate || new Date(),
    height: this.props.userProfile.height,  
    initialWeight: this.props.userProfile.initialWeight,
  };

  setDate = (newDate: Date) => {
    this.setState({ dueDate: newDate });
  }

  setDisplayName = (name: string) => {
    this.setState({ displayName: name });
  }

  setHeight = (height: number) => {
    this.setState({height})
  }

  setInitialWeight = (weight: number) => {
    this.setState({ initialWeight: weight });
  }

  handleDrawerOpen = (event: NativeSyntheticEvent<NativeTouchEvent>) =>
    this.props.navigation.openDrawer()

  weightOptions = () => [...Array(301).keys()].map(w => w+50);
  heightOptions = () => [...Array(100).keys()].map(w => w+50);

  handleSubmit = () => {
    const updatedUser = {...this.props.userProfile, ...this.state};
    this.props.dispatch(updateUserAction(updatedUser));
  }

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.handleDrawerOpen}>
          <Image source={require('./assets/images/menu-icon.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <ScrollView>
          <Text>This is your profile screen, {this.props.userProfile.displayName}.  Here you will input your height, due date and your weight at the beginning of your pregnancy (it's okay to estimate!).</Text>
          <FormLabel>Display Name</FormLabel>
          <FormInput onChangeText={this.setDisplayName}/>
          <Text>Your Due Date:</Text>
          <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            />
            <Text>Height:</Text>
            {/* TODO: Handle Android picker */}
            <PickerIOS
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your height"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.height}
                onValueChange={this.setHeight}
              >
              {this.heightOptions().map(i => (
                <Picker.Item key={i} label={i.toString()} value={i} />
              ))}
            </PickerIOS>
            <Text>Initial Weight:</Text>
            {/* TODO: Handle Android picker */}
            <PickerIOS
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your initial weight"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.initialWeight}
                onValueChange={this.setInitialWeight}
              >
              {this.weightOptions().map(i => (
                <Picker.Item key={i} label={i.toString()} value={i} />
              ))}
              </PickerIOS>
              <Button onPress={this.handleSubmit}><Text>Submit Changes</Text></Button>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {userProfile: state.userProfile}
}

export const ProfileContainer = connect(mapStateToProps)(Profile);

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
