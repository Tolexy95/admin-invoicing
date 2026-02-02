import * as Yup from "yup";

export const clientValidationSchema = Yup.object({
    firstName: Yup.string()
    .required("First Name is required"),
    lastName: Yup.string()
    .required("Last Name is required"),
    company: Yup.string()
    .required("Company is required"),
    email: Yup.string()
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Must be a valid email'),
   phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(?:(080|081|090|070|091)[0-9]{8})$/, 'Must match the specified format'),
});



export const loginValidation = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Must be a valid email'),
  password: Yup.string()
    .required('Password is required!')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[a-z]/, 'At least one lowercase letter')
    .matches(/[0-9]/, 'At least one digit (number)')
    .matches(/(?=.*)[!@#?'\-_$.%^&*)(|~=+}{,;:~</>[\]`]/, 'At least one special character')
    .matches(/^.{8,}$/, 'At least 8 characters'),
});


export const passwordResetValidation = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Must be a valid email'),
});


// export const passwordChangeValidation = Yup.object({
//   email: Yup.string()
//     .required('Email is required!')
//     .matches(loggedInEmail, 'Must be a valid email'),
//   oldPassword: Yup.string()
//     .required('Enter your old password'),
//   newPassword: Yup.string()
//     .required('Password is required')
//     .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#?'\-_$.%^&*)(|~=+}{,;:~</>[\]`])/, 'Password is weak, See specifications below'),
//   confirmPassword: Yup.string()
//     .required('Confirm your chosen password')
//     .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
// });