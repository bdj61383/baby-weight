import React from 'react';
import { Button, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import { signOffUserAction, UserAction } from './actions';
import { AppState, UserProfile } from './interfaces';

interface Props {
  dispatch: any, // TODO: What is the type for a thunk action?
  user: UserProfile
}

// TODO: style logout button 
class LogOutButton extends React.Component<Props, {}> {
  handleButtonPress = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    this.props.dispatch(signOffUserAction(this.props.user))
  }

  render() {
    return <Button title="Logout" onPress={this.handleButtonPress} />
  }
}

const mapStateToProps = (state: AppState) =>
  ({user: state.user})

export const LogOutButtonContainer = connect(mapStateToProps)(LogOutButton);
