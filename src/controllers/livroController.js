import { Op } from "sequelize";
import EmprestimoLivro from "../models/EmprestimoLivro";
import Livro from "../models/Livro"

// função de get que agrupa todos os get's ==> funciona para buscar todos os registros ou só um específico
const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    // caso ele não passe um id como parâmetro na requisição, significa que a resposta vai retornar todos
    // os registros da tabela
    if(!id) {
      let response = await Livro.findAll({
        order: [['id', 'asc']]
      });
      return res.status(200).send({
        type: 'success',
        message: `Registros carregados com sucesso!`,
        data: response
      });
    }

    // caso ele encontre um id, significa que a resposta vai retornar um regsitro específico

    let response = await Livro.findOne({ where: { id } }); // pega pelo id

    // se não existir response, ou seja, se não encontrar o registro pelo id
    if(!response) {
      return res.status(404).send({
        type: 'error',
        message: `Nenhum registro com id: ${id}`,
        data: []
      });
    }

    // se ele passar pelos casos de teste, ele retorna o registro único

    return res.status(200).send({
      type: 'success',
      message: `Registro carregado com sucesso!`,
      data: response
    });

  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}

const persist = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if(!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);

  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}

const create = async (dados, res) => {
  let { titulo, sinopse, idCategoria, idAutor } = dados;

  let response = await Livro.create({ titulo, sinopse, idCategoria, idAutor });

  return res.status(200).send({
    type: 'success',
    message: `Cadastro realizado com sucesso!`,
    data: response
  });
}

const update = async (id, dados, res) => {
  let response = await Livro.findOne({ where: { id } });

  // sempre que fizer uma busca de registro único, verificar se existe aquele registro
  if(!response) {
    return res.status(404).send({
      type: 'error',
      message: `Nenhum registro com id: ${id}`,
      data: []
    });
  }

  Object.keys(dados).forEach(field => response[field] = dados[field]);

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro com id: ${id} atualizado com sucesso!`,
    data: response
  });

}

const destroy = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if(!id) {
      return res.status(404).send({
        type: 'error',
        message: `Informe um id para deletar o registro`,
        data: []
      });
    }

    let response = await Livro.findOne({ where: { id } });

    if(!response) {
      return res.status(404).send({
        type: 'error',
        message: `Nunhum registro com id: ${id}`,
        data: []
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro deletado com sucesso!`,
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}

const getLivrosDisponiveis = async (_, res) => {
  try {
    let livros = await Livro.findAll();
    let livrosDisponiveis = [];
    for(let livro of livros) {
      let emprestimo = await livro.getEmprestimos({
        where: {
          [Op.not]: [{devolucao: null}]
        }
      });
      if(!emprestimo.length) {
        livrosDisponiveis.push(livro);
      }
    }

    return res.status(200).send({
      type: 'success',
      message: `Registros carregados com sucesso!`,
      data: livrosDisponiveis
    });

  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}

const getLivrosStatus = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    
    if(!id) {
      return res.status(500).send({
        type: 'error',
        message: `Informe um id`,
        data: []
      });
    }

    let livro = await Livro.findOne({ where: { id } });

    if(!livro) {
      return res.status(404).send({
        type: 'error',
        message: `Nunhum registro com id: ${id}`,
        data: []
      });
    }
    
    let emprestimo = await livro.getEmprestimos({ 
      where:{
        devolucao: {
          [Op.is]: null
        }
      } 
    });

    livro = livro.toJSON();

    if(!emprestimo.length) {
      livro.status = 'disponível'
    } else {
      livro.status = 'não disponível'
    }

    return res.status(200).send({
      type: 'success',
      message: `Registros carregados com sucesso!`,
      data: livro
    });

  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}

export default { get, persist, destroy, getLivrosDisponiveis, getLivrosStatus };
