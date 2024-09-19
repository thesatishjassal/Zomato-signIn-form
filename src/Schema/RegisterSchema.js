import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits") // Ensure OTP is exactly 6 digits
    .required("OTP is required"),
});
