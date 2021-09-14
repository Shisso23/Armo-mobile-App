import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { ProfileForm } from '../../../components/forms';
import { userService } from '../../../services';
import { userModel } from '../../../models';

import { RootReducer } from '../../../reducers/types';

const ProfileScreen: React.FC = () => {
  const { user } = useSelector((reducers: RootReducer) => reducers.userReducer);
  const _onFormSuccess = () => {};

  return (
    <View>
      <ProfileForm
        submitForm={userService.updateUser}
        onSuccess={_onFormSuccess}
        initialValues={userModel(user)}
      />
    </View>
  );
};

ProfileScreen.propTypes = {};
ProfileScreen.defaultProps = {};

export default ProfileScreen;
