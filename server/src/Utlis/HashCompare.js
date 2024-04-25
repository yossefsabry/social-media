import bcrypt from 'bcryptjs';

/**
 * @param {String} plaintext - the password 
 * description: Hash function to hash the passwordl
 * @return {String} hashResult - the hashed password
 */
export const Hash = (plaintext) => {
  const hashResult = bcrypt.hashSync(
    plaintext,
    parseInt(process.env.SALT_ROUNDS)
  );
  return hashResult;
};

/**
 * @param {Object} plaintext - object contains the plaintext and hash
 * @param {String} hash - the password after hashing
 * description: Compare function to compare the password with the hashed password
 * @return {Boolean} match - true if the password is correct 
 */
export const compare = ({ plaintext, hash } = {}) => {
  const match = bcrypt.compareSync(plaintext, hash);
  return match;
};
