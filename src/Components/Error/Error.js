import { Link } from 'react-router-dom';
import './Error.scss';

function Error({ moviesNotFound }) {
  if(moviesNotFound) {
    return (
      <div className="not-found">
        <h2>Não foi encontrado nenhum filme.</h2>
        <Link to="/">Voltar para o início</Link>
      </div>
    )
  };

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <Link to="/">Voltar para o início</Link>
    </div>
  );
}

export default Error;
