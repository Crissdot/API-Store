const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.users = [];
  }

  create(newUser) {
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
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
