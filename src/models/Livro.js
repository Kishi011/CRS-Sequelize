import { sequelize } from '../config';
import { DataTypes } from 'sequelize';
import Categoria from './Categoria';
import Autor from './Autor';

const Livro = sequelize.define(
  'livros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    sinopse: {
      type: DataTypes.STRING(500)
    },
  },
  {
    freezeTableName: true,
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Livro.belongsTo(Categoria, {
  as: 'categoria',

  // define a ação padrão dos triggers de delete e update
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',

  // define as configurações da foreing key
  foreignKey: {
    // name ==> o nome que será usado no javaScript
    name: 'idCategoria',
    // field ==> o nome que ficará no banco
    field: 'id_categoria',
    allowNull: false
  }
});

Livro.belongsTo(Autor, {
  as: 'autor',

  // define a ação padrão dos triggers de delete e update
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',

  // define as configurações da foreing key
  foreignKey: {
    // name ==> o nome que será usado no javaScript
    name: 'idAutor',
    // field ==> o nome que ficará no banco
    field: 'id_autor',
    allowNull: false
  }
});

export default Livro;
