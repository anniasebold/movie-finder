import './MovieCard.scss';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const movies =
  {
    "adult": false,
    "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
    "genre_ids": [
      28,
      80,
      53
    ],
    "id": 385687,
    "original_language": "en",
    "original_title": "Fast X",
    "overview": "Ao longo de muitas missões e contra probabilidades impossíveis, Dom Toretto e sua família foram mais espertos, mais nervosos e superaram todos os inimigos em seu caminho. Agora, eles enfrentam o oponente mais letal que já enfrentaram: uma ameaça terrível emergindo das sombras do passado, alimentada por vingança de sangue e determinada a destruir esta família e destruir tudo - e todos - que Dom ama, para sempre. .",
    "popularity": 4334.616,
    "poster_path": "/4CWoalqAsRzXD9AFbByD1KnH40E.jpg",
    "release_date": "2023-05-17",
    "title": "Velozes & Furiosos 10",
    "video": false,
    "vote_average": 6.9,
    "vote_count": 449
};

const genres = [
  {
      "id": 28,
      "name": "Action"
  },
  {
      "id": 80,
      "name": "Crime"
  },
  {
      "id": 99,
      "name": "Documentary"
  },
  {
      "id": 53,
      "name": "Thriller"
  }
]
function MovieCard() {
  return (
    <>
    <Container>
      <Row xs={1} md={2} className="">
        <Col md={3}>
          <Card id="movie-card">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`} />
            <Card.Body>
              <Card.Title>{movies.title}</Card.Title>
              <Card.Text>{movies.genre_ids.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card id="movie-card">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`} />
            <Card.Body>
              <Card.Title>{movies.title}</Card.Title>
              <Card.Text>{movies.genre_ids.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card id="movie-card">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`} />
            <Card.Body>
              <Card.Title>{movies.title}</Card.Title>
              <Card.Text>{movies.genre_ids.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card id="movie-card">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`} />
            <Card.Body>
              <Card.Title>{movies.title}</Card.Title>
              <Card.Text>{movies.genre_ids.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card id="movie-card">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`} />
            <Card.Body>
              <Card.Title>{movies.title}</Card.Title>
              <Card.Text>{movies.genre_ids.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default MovieCard;
