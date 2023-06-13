import { sequelize } from '../config';
import { DataTypes } from 'sequelize';
import Livro from './Livro';
import Emprestimo from './Emprestimo';

const EmprestimoLivro = sequelize.define(
  'emprestimos_livros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

EmprestimoLivro.belongsTo(Livro, {
  as: 'livro',

  // define a ação padrão dos triggers de delete e update
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',

  // define as configurações da foreing key
  foreignKey: {
    // name ==> o nome que será usado no javaScript
    name: 'idLivro',
    // field ==> o nome que ficará no banco
    field: 'id_livro',
    allowNull: false,
    unique: true
  }
});

EmprestimoLivro.belongsTo(Emprestimo, {
  as: 'emprestimo',

  // define a ação padrão dos triggers de delete e update
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',

  // define as configurações da foreing key
  foreignKey: {
    // name ==> o nome que será usado no javaScript
    name: 'idEmprestimo',
    // field ==> o nome que ficará no banco
    field: 'id_emprestimo',
    allowNull: false,
    unique: true
  }
});

export default EmprestimoLivro;
