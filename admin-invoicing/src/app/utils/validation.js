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
    .required("Phone number is required"),
});

// export const loginValidation = Yup.object({
//   email: Yup.string()
//     .required('Email is required!')
//     .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Must be a valid email'),
//   password: Yup.string().required('Password is required!'),
// });

// export const passwordResetValidation = Yup.object({
//   newPassword: Yup.string()
//     .required('Password is required')
//     .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#?'\-_$.%^&*)(|~=+}{,;:~</>[\]`])/, 'Password is weak, See specifications below'),
//   confirmPassword: Yup.string()
//     .required('Confirm your chosen password')
//     .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
// });


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