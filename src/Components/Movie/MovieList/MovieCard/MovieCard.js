import { Card, Col } from 'react-bootstrap';
import './MovieCard.scss'

function MovieCard({ movie, genres }) {

  const getGenresName = (movie, genres) => {
    return (
      genres
        .filter(genre => movie.genre_ids.includes(genre.id))
        .map(genre => genre.name)
        .join(', ')
    )
  };

  return (
    <>
    <Col key={movie.id} md={3}>
      <Card id="movie-card">
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{getGenresName(movie, genres)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    </>
  );
}

export default MovieCard;
