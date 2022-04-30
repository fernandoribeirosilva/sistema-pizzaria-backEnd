import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface PizzaInstance extends Model {
   id: number;
   sabor: string;
   preco: string;
   tamanho: string;
   decricao: string;
   imagem: string;
}

export const Pizza = sequelize.define<PizzaInstance>('User', {
   id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
   },
   sabor: {
      type: DataTypes.STRING
   },
   preco: {
      type: DataTypes.STRING
   },
   tamanho: {
      type: DataTypes.STRING
   },
   decricao: {
      type: DataTypes.STRING
   },
   imagem: {
      type: DataTypes.STRING
   }
}, {
   tableName: 'pizza',
   timestamps: false
});