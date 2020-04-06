import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';
import DeliveryMan from '../app/models/DeliveryMan';

import databaseConfig from '../config/database';

const models = [File, User, Recipients, DeliveryMan];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.conection))
      .map(model => model.associate && model.associate(this.conection.models));
  }
}

export default new Database();
