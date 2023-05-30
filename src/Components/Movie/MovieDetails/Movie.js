import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";

import ActorCard from './ActorCard/ActorCard';
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import api from "../../../services/api";
import icons from "../../../assets/svgs";
import './Movie.scss'

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4';
const language = 'pt-BR';

function Movie() {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true); 

        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: language
          }
        });

        const responseCredits = await api.get(`movie/${id}/credits`, {
          params: {
            api_key: API_KEY,
            language: language
          }
        });

        setMovie(response.data);
        setActors(responseCredits.data.cast);

        setIsLoading(false);
      } catch(e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    if(!movie && !isLoading) {
      fetchMovieDetails();
    }
  }, [id, movie, isLoading]);

  if(isLoading) {
    return <Loading />;
  };

  if(!movie) {
    return <Error />;
  };

  const getDuration = (total) => {
    let hours = Math.floor(total / 60);
    let mins = total % 60;
    mins = mins < 10 ? "0" + mins: mins;
    return `${hours}h${mins}m`;
  }

  const data = new Date(movie.release_date).toLocaleDateString('pt-BR');
  
  const budget = movie.budget.toLocaleString('pt-BR');

  const voteAverage = movie.vote_average.toFixed(1);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const rest = rating - filledStars;

    const stars = [];

    for(let i = 0; i < filledStars; i++) {
      stars.push(<i className="fa fa-star" key={i}></i>);
    };

    if(rest > 0) {
      stars.push(<i className="fa fa-star-half" key={filledStars}></i>);
    };

    const emptyStars = 10 - (filledStars + (rest > 0 ? 1 : 0));
    for(let i = 0; i < emptyStars; i++) {
      stars.push(<i className="fa fa-star-o" key={filledStars + (rest > 0 ? 1 : 0) + i}></i>)
    };

    return stars;
  }

  return (
    <div className="movie-details">
      <Container>
        <Row>
          <Col xs={12} md={4} className="movie-poster">
            <img 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            >
            </img>
          </Col>
          <Col xs={12} md={8} className="movie-info">
            <h2>{movie.title}</h2>
            <h3>{movie.tagline}</h3>
            <p>{movie.overview}</p>
            <p>Data de lançamento: {data}</p>
            <p>Duração: {getDuration(movie.runtime)}</p>
            <p>Orçamento: R${budget}</p>
            <p className="genres-text">Genêros: </p>{"  "}
            {movie.genres.map((genre) => (
              <Badge id="badge-genre" bg="warning" key={genre.id} text="dark">
                {genre.name}
              </Badge>
            ))}
            <div className="note-stars">
              <p>Nota: {voteAverage}</p>
              <p>{renderStars(voteAverage)}</p>
            </div>
            <Button variant="success" className="button-watchlist">
              <i>{icons.bookmarkIcon}</i>
              Adicionar a Watchlist
            </Button>{' '}
          </Col>

        </Row>
        <Row className="actors-details">
          <Col xs={12} md={12}>
            <h2>ATORES:</h2>
          </Col>
            {actors.map((actor) => (
              <ActorCard actor={ actor } key={actor.id}/>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Movie;