import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface PizzaInstance extends Model {
   id: number;
   sabor: string;
   preco: string;
   tamanho: string;
   descricao: string;
   imagem: string;
}

export const Pizza = sequelize.define<PizzaInstance>('Pizza', {
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
   descricao: {
      type: DataTypes.STRING
   },
   imagem: {
      type: DataTypes.STRING
   }
}, {
   tableName: 'pizza',
   timestamps: false
});