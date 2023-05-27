import './MovieCard.scss';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4'
const language = 'pt-BR'

function MovieCard() {
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

  const getGenresName = (movie) => {
    return (
      genres
        .filter(genre => movie.genre_ids.includes(genre.id))
        .map(genre => genre.name)
        .join(', ')
    )
  }

  return (
    <>
    <Container>
      <Row xs={1} md={2} className="">
        {movies.map((movie) => (
          <Col key={movie.id} md={3}>
            <Card id="movie-card">
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{getGenresName(movie)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))};
      </Row>
    </Container>
    </>
  );
}

export default MovieCard;
