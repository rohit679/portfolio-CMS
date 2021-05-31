import passport from "passport";
import { httpHandler } from '../../common/http-handler';
import authServices from '../service';
import {Router} from "express";
require('../../../config/Passport')(passport);

const router = Router();

// Router for user login
router.post('/login', httpHandler(async (req, res)=>{
  const { email, password } = req.body;
  const payload = await authServices.doLogin({email:email.toLowerCase() , password});
  res.send(payload);
}));

// Router for register users
router.post(
  "/register",
  httpHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await authServices.doRegister({ email:email.toLowerCase(), password });
    res.send(response);
  }
));

// Router for getting current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  httpHandler(async (req, res) => {
    res.json(req.user);
  }
)
);

// Router for getting all the users
router.get(
  '/get-all-users',
  passport.authenticate("jwt", { session: false }),
  httpHandler(async (req, res) => {
    const data = await authServices.getAllUser();
    res.send(data);
  })
);

// Router for getting unique user
router.get(
  '/get-a-user/:id',
  passport.authenticate("jwt", { session: false }),
  httpHandler(async (req, res) => {
    const id = req.params.id;
    const data = await authServices.getAUser(id);
    res.send(data);
  })
);

router.put(
  '/change-password',
  passport.authenticate("jwt", { session: false }),
  httpHandler(async (req, res) => {
    const {email} = req.user;
    const { old_password, new_password } = req.body;
    await authServices.changePassword({ old_password, new_password, email });
    res.send({
      message : 'password changed successfully'
    });
  })
);

export default router;