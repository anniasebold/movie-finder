import { Button, Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import './MovieList.scss';
import MovieCard from './MovieCard/MovieCard';
import api from '../../../services/api';
import Error from '../../Error/Error';
import { Helmet } from 'react-helmet';

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4'
const language = 'pt-BR'

function MovieList({ movieSearch }) {
  const [movies, setMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const fetchMoviesSearch = async (movieSearch) => {
    try {
      const response = await api.get('/search/movie', {
        params: {
          api_key: API_KEY,
          language: language,
          query: movieSearch
        }
      });

      setMovies(response.data.results);
    } catch(e) {
      console.error(e);
    }
  };

  const fetchMovies = async (page = 1) => {
    try {
      const response = await api.get('/movie/now_playing', {
        params: {
          api_key: API_KEY,
          language: language,
          page: page
        }
      });

      return response.data.results;
    } catch(e) {
      console.error(e);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await api.get('/genre/movie/list', {
        params: {
          api_key: API_KEY,
          language: language
        }
      });
        
      setGenres(response.data.genres);
    } catch(e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    fetchGenres();
  }, []);

  React.useEffect(() => {
    if(movieSearch) {
      fetchMoviesSearch(movieSearch);
    } else {
      const loadInitialMovies = async () => {
        const initialMovies = await fetchMovies();
        setMovies(initialMovies);
      };
      loadInitialMovies();
    }
  }, [ movieSearch ]);
  

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const newMovies = await fetchMovies(nextPage); 
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage(nextPage);
  }

  return (
    <> 
      <Helmet>
        <title>Movie Finder</title>
      </Helmet>
      {movieSearch && movies.length === 0 && (
        <Error moviesNotFound={true} />
      )}
      <Container>
        <div className='d-flex flex-wrap justify-content-md-between justify-content-center'>
          <Row xs={1} md={2}>
            {movies.map((movie) => (
              <Col md={3} className={movies.length === 1 ? 'list-movie-1' : (movies.length === 2 ? 'list-movie-2' : '')}>
                <MovieCard key={movie.id} movie={movie} genres={genres}/>
              </Col>
            ))}
          </Row>
        </div>
        {!movieSearch && (   
          <div className="d-grid gap-2">
            <Button id="btn-see-more" variant="success" onClick={loadMoreMovies} size="lg">
              Ver Mais
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default MovieList;
