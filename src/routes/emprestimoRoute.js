import emprestimoController from "../controllers/emprestimoController";

export default (app) => {
  app.get('/emprestimos', emprestimoController.get);
  app.get('/emprestimos/:id', emprestimoController.get);
  app.post('/emprestimos', emprestimoController.persist);
  app.patch('/emprestimos/:id', emprestimoController.persist);
  app.delete('/emprestimos/deleta/:id', emprestimoController.destroy);
}