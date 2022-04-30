import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface AdmInstance extends Model {
   id: number;
   login: string;
   password: string;
}

export const Adm = sequelize.define<AdmInstance>('User', {
   id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
   },
   login: {
      type: DataTypes.STRING
   },
   password: {
      type: DataTypes.STRING
   }
}, {
   tableName: 'adm',
   timestamps: false
});