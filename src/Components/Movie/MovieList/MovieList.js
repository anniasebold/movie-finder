import './MovieList.scss';
import { Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import MovieCard from './MovieCard/MovieCard';

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4'
const language = 'pt-BR'

function MovieList() {
  const [movies, setMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const fetchMovies = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`
      );

      return response.data.results;
    } catch(e) {
      console.error(e);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`
      );
        
      setGenres(response.data.genres);
    } catch(e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    fetchGenres();
  }, []);

  React.useEffect(() => {
    const loadInitialMovies = async () => {
      const initialMovies = await fetchMovies();
      setMovies(initialMovies);
    };
  
    loadInitialMovies();
  }, []);
  

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const newMovies = await fetchMovies(nextPage); 
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage(nextPage);
  }

  return (
    <>
    <Container>
      <Row xs={1} md={2} className="">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres}/>
        ))};
        <Button id="btn-see-more" variant="success" onClick={loadMoreMovies}>
          Ver Mais
        </Button>
      </Row>
    </Container>
    </>
  );
}

export default MovieList;
