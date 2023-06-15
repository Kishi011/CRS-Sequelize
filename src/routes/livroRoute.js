import livroController from "../controllers/livroController";

export default (app) => {
  app.get('/livros', livroController.get);
  app.get('/livros/disponiveis', livroController.getLivrosDisponiveis);
  app.post('/livros', livroController.persist);
  app.get('/livros/:id', livroController.get);
  app.get('/livros/status/:id', livroController.getLivrosStatus);
  app.patch('/livros/:id', livroController.persist);
  app.delete('/livros/deleta/:id', livroController.destroy);

}