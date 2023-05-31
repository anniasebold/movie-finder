import { Card } from 'react-bootstrap';
import './MovieCard.scss'
import { Link } from 'react-router-dom';

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
    <Link to={`/movie/${movie.id}`} id="link-movie">
      <Card id="movie-card">
        <Card.Img 
          variant="top" 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{getGenresName(movie, genres)}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default MovieCard;
