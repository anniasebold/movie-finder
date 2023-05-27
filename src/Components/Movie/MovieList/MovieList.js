import './MovieCard.scss';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import MovieCard from './MovieCard/MovieCard';

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4'
const language = 'pt-BR'

function MovieList() {
  const [movies, setMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}`
        );

        setMovies(response.data.results);
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
    }

    fetchMovies();
    fetchGenres();
  }, []);

  return (
    <>
    <Container>
      <Row xs={1} md={2} className="">
        {movies.map((movie) => (
          <MovieCard movie={movie} genres={genres}/>
        ))};
      </Row>
    </Container>
    </>
  );
}

export default MovieList;
