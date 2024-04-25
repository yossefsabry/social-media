import otpGenerator from "otp-generator";

/**
 * description: generate a random otp for little security and verification for session 
 * @returns {string} return a random otp
 */
export const otp = () => {
  return otpGenerator.generate(parseInt(process.env.OTP_DIGETS), {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });
};
