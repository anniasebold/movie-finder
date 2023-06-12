import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { WatchlistContext } from '../../context/Watchlist';
import { API_KEY, api, language } from '../../services/apiMovies';
import Loading from '../../components/Loading/Loading';
import MovieCard from '../Movie/MovieList/MovieCard/MovieCard';
import './Watchlist.scss'

function Watchlist() {
  const watchlist = useContext(WatchlistContext);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const promises = watchlist.map(async movie => {
          const result = await api.get(`/movie/${movie.movie_id}`, {
            params: {
              api_key: API_KEY,
              language: language
            }
          });
          return result.data;
        });
        const results = await Promise.all(promises);
        setMovies(results);

        setLoading(false);
      } catch(e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [ watchlist ]);

  if(loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="watchlist-card">
        <h1>Minha Watchlist</h1>
        {watchlist.length === 0 ? (
          <>
            <div className="watchlist-empty">
              <h5>Você ainda não adicionou filmes na sua Watchlist.</h5>
              <Link to="/" id="button-home">Voltar para o início</Link>
            </div>
          </>
        )
        : (
          <Container>
            <div className='d-flex flex-wrap justify-content-md-between justify-content-center'>
              <Row xs={1} md={2}>
                {movies.map((movie) => (
                  <Col key={movie.id} md={4} className={movies.length === 1 ? 'list-movie-1' : ''}>
                    <MovieCard key={movie.id} movie={movie} genresMovie={movie.genres}/>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        )}
      </div>
    </>
  )
}

export default Watchlist;