import autorController from "../controllers/autorController";

export default (app) => {
  app.get('/autores', autorController.get);
  app.get('/autores/:id', autorController.get);
  app.post('/autores', autorController.persist);
  app.patch('/autores/:id', autorController.persist);
  app.delete('/autores/deleta/:id', autorController.destroy);
}