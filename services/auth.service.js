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

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if(!user) throw boom.unauthorized();

    const payload = {
      sub: user.id,
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const updatedUser = await service.update(user.id, { recoveryToken: token });

    // TODO add view in frontend
    // Example
    // const link = `http://frontend.com/recovery?token=${updatedUser.recoveryToken}`;
    const link = updatedUser.recoveryToken;

    const mail = {
      from: config.senderUserMail,
      to: user.email,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link} </b>`,
    }

    const success = await this.sendMail(mail);
    return success;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub)
      if(user.recoveryToken !== token) throw boom.unauthorized();

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });

      return { message: 'Password changed' };
    } catch(error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.senderUserMail,
        pass: config.senderUserPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Mail sended' };
  }

}

module.exports = AuthService;
