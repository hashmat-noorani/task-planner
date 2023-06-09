import Joi from "joi";
import { User,Sprint } from "../../models/index.js";
import bcrypt from "bcrypt";
import { CustomErrorHandler } from "../../services/index.js";

export const registerController = {
  async register(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    // validation
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ firstName, email, password });

    if (error) {
      return next(error);
    }

    // check if user already exists;
    try {
      const exist = await User.exists({ email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }

      // hash password
      const hashedPwd = await bcrypt.hash(password, 10);

      const payload = {
        firstName,
        ...(lastName && { lastName }),
        email,
        password: hashedPwd,
      };

      const user = await User.create(payload);

      await Sprint.create({
        name: "Sprint 1",
        slug: "sprint-1",
        user: user._id,
      });

      res.status(201).json({
        success: true,
        message: "Account created Succesfully..!",
      });
    } catch (err) {
      return next(err);
    }
  },
};
