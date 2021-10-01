import React from 'react';

import { FormScreenContainer } from '../../../components';
import { ForgotPasswordForm } from '../../../components/forms';
import { userAuthService } from '../../../services';
import { forgotPasswordModel } from '../../../models';

const ForgotPasswordScreen: React.FC = () => {
  return (
    <FormScreenContainer>
      <ForgotPasswordForm
        submitForm={userAuthService.forgotPassword}
        initialValues={forgotPasswordModel()}
      />
    </FormScreenContainer>
  );
};

ForgotPasswordScreen.propTypes = {};
ForgotPasswordScreen.defaultProps = {};

export default ForgotPasswordScreen;
