import emprestimoLivroController from "../controllers/emprestimoLivroController";

export default (app) => {
  app.get('/emprestimos-livros', emprestimoLivroController.get);
  app.get('/emprestimos-livros/:id', emprestimoLivroController.get);
  app.post('/emprestimos-livros', emprestimoLivroController.persist);
  app.patch('/emprestimos-livros/:id', emprestimoLivroController.persist);
  app.delete('/emprestimos-livros/deleta/:id', emprestimoLivroController.destroy);
}