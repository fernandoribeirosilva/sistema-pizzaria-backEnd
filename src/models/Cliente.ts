import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface ClienteInstance extends Model {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
}

export const Cliente = sequelize.define<ClienteInstance>('Cliente', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING
    },
    rua: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.STRING
    },
    complemento: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'cliente',
    timestamps: false
});