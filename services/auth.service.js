const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./users.service');

const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if(!user) throw boom.unauthorized();

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw boom.unauthorized();

    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, config.jwtSecret);

    return { user, token }
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if(!user) throw boom.unauthorized();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.senderUserMail,
        pass: config.senderUserPassword,
      },
    });

    await transporter.sendMail({
      from: config.senderUserMail,
      to: config.receiverUserMailTest,
      subject: 'Este es un correo de prueba usando node',
      text: 'Probando 1 2 3',
    });

    return { message: 'Mail sended' };
  }

}

module.exports = AuthService;
