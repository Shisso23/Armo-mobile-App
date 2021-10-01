import React from 'react';

import { FormScreenContainer } from '../../../components';
import { RegisterForm } from '../../../components/forms';
import { userAuthService } from '../../../services';
import { registrationUserModel } from '../../../models';

const RegisterScreen: React.FC = () => {
  const _onFormSuccess = () => {};

  return (
    <FormScreenContainer>
      <RegisterForm
        submitForm={userAuthService.register}
        onSuccess={_onFormSuccess}
        initialValues={registrationUserModel()}
      />
    </FormScreenContainer>
  );
};

RegisterScreen.propTypes = {};
RegisterScreen.defaultProps = {};

export default RegisterScreen;
