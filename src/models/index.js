import Autor from "./Autor";
import Categoria from "./Categoria";
import Emprestimo from "./Emprestimo";
import EmprestimoLivro from "./EmprestimoLivro";
import Livro from "./Livro";
import Usuario from "./Usuario";


// define uma função assíncrona anônima e executa ela logo em seguida
(async () => {
  // force: true ==> se a tabela já existe, ele força a criação da tabela

  /*  ===============================================================================================================
      
      OBS: A ORDEM DE CRIAÇÃO DAS TABELAS DEVEM SEGUIR A REGRA DAS CHAVES ==> PRIMEIRO QUEM NÃO TEM CHAVE ESTRANGEIRA
      DE CIMA PARA BAIXO.

      =============================================================================================================== */

  await Usuario.sync({ force: true });
  await Autor.sync({ force: true });
  await Categoria.sync({ force: true });
  await Emprestimo.sync({ force: true });
  await Livro.sync({ force: true });
  await EmprestimoLivro.sync({ force: true });

})();