import { Button, ButtonGroup, Col, Container, Row, ToggleButton } from 'react-bootstrap';
import React from 'react';
import MovieCard from './MovieCard/MovieCard';
import { api, API_KEY, language } from '../../../services/apiMovies';
import Error from '../../../components/Error/Error';
import { Helmet } from 'react-helmet';
import './MovieList.scss';

function MovieList({ movieSearch }) {
  const [movies, setMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [radioValue, setRadioValue] = React.useState('now_playing');
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

  const fetchMovies = async (value, page = 1) => {
    try {
      const response = await api.get(`/movie/${value}`, {
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
        const initialMovies = await fetchMovies(radioValue);
        setMovies(initialMovies);
      };
      loadInitialMovies();
    }
  }, [ movieSearch, radioValue ]);
  

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const newMovies = await fetchMovies(radioValue, nextPage); 
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage(nextPage);
  }

  const values = [
    { name: 'Em cartaz', value: 'now_playing' },
    { name: 'Populares', value: 'popular' },
    { name: 'Mais votados', value: 'top_rated' },
    { name: 'Em breve', value: 'upcoming' },
  ];

  return (
    <> 
      <Helmet>
        <title>Movie Finder</title>
      </Helmet>
      {movieSearch && movies.length === 0 && (
        <Error moviesNotFound={true} />
      )}
      <Container>
        {!movieSearch && (
          <>
            <ButtonGroup style={{ display: 'inline-block' }}>
              {values.map((selected, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type='radio'
                  variant={radioValue === selected.value ? 'outline-success' : 'outline-tranparent'}
                  style={{ color: '#FFF', border: '1px solid #2424246B' }}
                  value={selected.value}
                  checked={radioValue === selected.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                  onClick={() => fetchMovies(radioValue)}
                >
                  {selected.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br />
            <br />
          </>
        )}
        <div className='d-flex flex-wrap justify-content-md-between justify-content-center'>
          <Row xs={1} md={2}>
            {movies.map((movie) => (
              <Col key={movie.id} md={3} className={movies.length === 1 ? 'list-movie-1' : ''}>
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
