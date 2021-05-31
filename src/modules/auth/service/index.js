import adminModel from '../model';
import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import keys from '../../../config/keys';

const getSignedToken = ({ payload, key  }) => new Promise((resolve, reject) => {
  jwt.sign(payload, key, {expiresIn: 3600}, (err, token) => {
    if (err) return reject(err);
    resolve(token);
  });
});

const authServices = {};

authServices.doLogin = async ({ email, password }) => {
  assert(email!==null && password!=null, createError(StatusCodes.BAD_REQUEST, 'Required email & Password'));
  const admin = await adminModel.findOne({ email: email });
  assert(admin != null, createError(StatusCodes.UNAUTHORIZED, "Email doesn't exist"));
  assert(md5(password) === admin.password, createError(StatusCodes.UNAUTHORIZED, 'Invalid Credentials'));
  const payload = {
    email: admin.email
  };
  const token = await getSignedToken({ payload, key: keys.secretKey });
  return {...payload, token : token};
};

authServices.doRegister = async ({ email, password }) => {
  const record = await adminModel.findOne({email:email});
  assert(record==null, createError(StatusCodes.BAD_REQUEST,'Email already exists'));
  const hashPassword = md5(password);
  const result = await adminModel.create({ email, password:hashPassword });
  return result;
}

authServices.getAllUser = async () => await adminModel.find({}, {password : 0});

authServices.getAUser = async (id) => await adminModel.findById(id, {password : 0});

authServices.changePassword = async ({ old_password, new_password, email }) => {
  assert(
    new_password && old_password, 
    createError(StatusCodes.BAD_REQUEST, "old and new password required")
  );
  const user = await adminModel.findOne({email : email, password : md5(old_password)});
  assert(
    user,
    createError(StatusCodes.BAD_REQUEST, "Old Password didn't matched")
  );
  assert(
    new_password !== old_password,
    createError(StatusCodes.BAD_REQUEST, "New password can't be same as old password")
  );
  const hashed_password = md5(new_password);
  await adminModel.findOneAndUpdate({email : email}, {password : hashed_password});
}

export default authServices;