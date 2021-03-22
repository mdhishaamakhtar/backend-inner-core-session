const User = require("../models/users");
const uuid4 = require("uuid4");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

class UserController {
  static async register(username, password) {
    try {
      const exists = await User.findOne({where: {username: username}})
      if (exists) {
        return {
          code: 409,
          message: "User already exists"
        }
      }
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
      const pass = await bcrypt.hash(password, salt);
      const user = {
        userId: uuid4(),
        username: username,
        password: pass
      }
      await User.create(user)
      return {
        code: 201,
        message: "User created"
      }
    } catch (err) {
      return {
        code: 500,
        message: err.toString()
      }
    }
  }

  static async login(username, password) {
    try {
      const exists = await User.findOne({where: {username: username}})
      if (!exists) {
        return {
          code: 404,
          message: "User doesnt exist"
        }
      }
      const pass = await bcrypt.compare(password, exists.password);
      if (!pass) {
        return {
          code: 401,
          message: "Wrong Password"
        }
      }
      const token = jwt.sign({
        id: exists.userId
      }, process.env.SECRET_KEY)
      return {
        code: 200,
        token: token
      }
    } catch (err) {
      return {
        code: 500,
        message: err.toString()
      }
    }
  }
}

module.exports = UserController