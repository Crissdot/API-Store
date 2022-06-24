const boom = require('@hapi/boom');

const pool = require('../libs/postgres');

class UsersService {

  constructor() {
    this.users = [];
    this.pool = pool;
    this.pool.on('ERROR', console.log);
  }

  create(newUser) {
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const queryString = 'SELECT * FROM users';
    const query = await this.pool.query(queryString);
    return query.rows;
  }

  findOne(id) {
    const user = this.users.find(item => item.id === id);
    if(!user) throw boom.notFound('Usuario no encontrado');
    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1) throw boom.notFound('Usuario no encontrado');
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    }
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1) throw boom.notFound('Usuario no encontrado');
    const user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }

}

module.exports = UsersService;
