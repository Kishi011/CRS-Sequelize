import categoriaController from "../controllers/categoriaController";

export default (app) => {
  app.get('/categorias', categoriaController.get);
  app.get('/categorias/:id', categoriaController.get);
  app.post('/categorias', categoriaController.persist);
  app.patch('/categorias/:id', categoriaController.persist);
  app.delete('/categorias/deleta/:id', categoriaController.destroy);
}