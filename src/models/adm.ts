import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface AdmInstance extends Model {
   id: number;
   name: string;
   password: string;
}

export const Adm = sequelize.define<AdmInstance>('Adm', {
   id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
   },
   name: {
      type: DataTypes.STRING
   },
   password: {
      type: DataTypes.STRING
   }
}, {
   tableName: 'adm',
   timestamps: false
});