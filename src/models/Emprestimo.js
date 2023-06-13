import { sequelize } from '../config';
import { DataTypes } from 'sequelize';
import Usuario from './Usuario';

const Emprestimo = sequelize.define(
  'emprestimos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prazo: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    devolucao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Emprestimo.belongsTo(Usuario, {
  as: 'usuario',

  // define a ação padrão dos triggers de delete e update
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',

  // define as configurações da foreing key
  foreignKey: {
    // name ==> o nome que será usado no javaScript
    name: 'idUsuario',
    // field ==> o nome que ficará no banco
    field: 'id_usuario',
    allowNull: false
  }
});

export default Emprestimo;
