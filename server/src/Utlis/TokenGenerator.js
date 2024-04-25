import jwt from 'jsonwebtoken';

/** 
 * description: Generate a token
 * @returns {String} token - the generated token
 * */
export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  expiresIn = 60 * 60 * 24 * 30, // 30 days
} = {}) => {
  const token = jwt.sign(payload, signature, {
    expiresIn: parseInt(expiresIn), 
  })
  return token;
};

/**
 * description: Verify the token check if it is valid
 * @return {Object} decoded - the decoded token
 * */
export const verifyToken = ({
  token,
  signature = process.env.TOKEN_SIGNATURE
} = {}) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};
