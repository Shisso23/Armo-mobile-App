import * as Yup from 'yup';

const paswordExpression =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.*[!@#$%^&*])(?=.{6,})/;

export const emailSchema = Yup.string().email('Invalid Email').trim().required('Email is required');
export const passwordSchema = Yup.string().required('Password is required');

export const registerPasswordSchema = Yup.string()
  .matches(
    paswordExpression,
    'Password must contain at least an uppercase and lowercase letters, digit and a special character!',
  )
  .required('Password is required');

export const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm password is required');
Yup.string().notRequired();

export const termsAndConditionsSchema = Yup.bool()
  .oneOf([true])
  .required('You have to accept the terms to register an account');
