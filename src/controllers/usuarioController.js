import Usuario from "../models/Usuario";

// função de get que agrupa todos os get's ==> funciona para buscar todos os registros ou só um específico
const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    // caso ele não passe um id como parâmetro na requisição, significa que a resposta vai retornar todos
    // os registros da tabela
    if(!id) {
      let response = await Usuario.findAll({
        order: [['id', 'asc']]
      });
      return res.status(200).send({
        type: 'success',
        message: `Registros carregados com sucesso!`,
        data: response
      });
    }

    // caso ele encontre um id, significa que a resposta vai retornar um regsitro específico

    let response = await Usuario.findOne({ where: { id } }); // pega pelo id

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
  let { nome, cpfCnpj, email, telefone } = dados;

  let response = await Usuario.create({ nome, cpfCnpj, email, telefone });

  return res.status(200).send({
    type: 'success',
    message: `Cadastro realizado com sucesso!`,
    data: response
  });
}

const update = async (id, dados, res) => {
  let response = await Usuario.findOne({ where: { id } });

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

    let response = await Usuario.findOne({ where: { id } });

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

export default { get, persist, destroy };
