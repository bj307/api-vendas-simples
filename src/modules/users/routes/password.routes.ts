import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SendEmailResetPasswordController from '../controllers/SendEmailResetPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const sendEmailReset = new SendEmailResetPasswordController();
const resetPassword = new ResetPasswordController();

passwordRouter.post(
  '/send-reset',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendEmailReset.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.create,
);

export default passwordRouter;
