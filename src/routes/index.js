import autorRoute from "./autorRoute";
import categoriaRoute from "./categoriaRoute";
import emprestimoLivroRoute from "./emprestimoLivroRoute";
import emprestimoRoute from "./emprestimoRoute";
import livroRoute from "./livroRoute";
import usuarioRoute from "./usuarioRoute";

export function Routes(app) {
  categoriaRoute(app);
  autorRoute(app);
  emprestimoRoute(app);
  livroRoute(app);
  usuarioRoute(app);
  emprestimoLivroRoute(app);
}