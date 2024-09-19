import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import Zomoto from "/assets/zomato-logo.png";
import OtpVerification from "./OtpVerication";
import { RegisterSchema } from "../Schema/RegisterSchema";

const LoginByPhoneNumber = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [RedirectEmailOtp, setRedirectEmailOTP] = useState(false);
  const [signupData, setSignupData] = useState(null); // State to store signup form data

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: RegisterSchema.pick(["phoneNumber"]),
    onSubmit: (values) => {
      if (!showOtpVerification) {
        setShowOtpVerification(true);
      } else {
        console.log("OTP Verified:", values);
      }
    },
  });

  const handleBackClick = () => {
    if (RedirectEmailOtp) {
      setShowOtpVerification(false);
    } else {
      setShowOtpVerification(false);
    }
  };
  
  const resendOtp = async () => {
    console.log("Resending OTP...");
    // return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleResendClick = async () => {
    try {
      await resendOtp();
      setTimeLeft(30);
      setResendPass(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleOtpSubmit = (otpValues) => {
    const combinedData = {
      ...signupData,
      otp: otpValues.otp,
    };
    console.log("Full JSON Data for API:", combinedData);
    setTimeLeft(0);
    // Now send combinedData to your API
    // Example API call:,
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(combinedData)
    // });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendPass(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={`SingInForm-container ${
            showOtpVerification ? "fade-out" : "fade-in"
          }`}
          style={{
            display: showOtpVerification ? "none" : "block",
          }}
        >
          <Stack alignItems="center" justifyContent="space-between">
            <div>
              <h3 className="heading poppins-medium">Let's Eat!</h3>
            </div>
            <img className="swiggy-icon" src={Zomoto} alt="Swiggy" />
          </Stack>
          <Divider className="div-25" />

          <div className="form-container">
            <FloatingLabelInput
              label="Phone Number"
              name="phone Number"
              value={formik.values.phoneNumber}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
              onBlur={formik.handleBlur}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
            />
          </div>

          <Button type="submit" className="btn" block>
            Send One Time Password
          </Button>
          <Divider>or</Divider>

          <p className="text-center action-text poppins-regular">
            New to Zomato? &nbsp;
            <a href="" className="active cta">
              Create an account
            </a>
          </p>
        </div>
        <OtpVerification
          onSubmit={handleOtpSubmit}
          resendPass={resendPass}
          handleResendClick={handleResendClick}
          timeLeft={timeLeft}
          showOtpVerification={showOtpVerification}
          handleBackClick={handleBackClick}
        />
      </form>
    </>
  );
};

export default LoginByPhoneNumber;
