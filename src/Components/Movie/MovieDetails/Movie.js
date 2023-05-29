import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Col, Container, Row } from "react-bootstrap";
import api from "../../../services/api";
import Loading from "../../Loading/Loading";
import Erro from "../../Erro/Erro";
import './Movie.scss'

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4';
const language = 'pt-BR';

function Movie() {
  const [movie, setMovie] = useState(null);
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

        setMovie(response.data);
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
    return <Erro />;
  };

  const getDuration = (total) => {
    let hours = Math.floor(total / 60);
    let mins = total % 60;
    mins = mins < 10 ? "0" + mins: mins;
    return `${hours}h${mins}m`;
  }

  const data = new Date(movie.release_date).toLocaleDateString('pt-BR');
  
  const budget = movie.budget.toLocaleString('pt-BR');

  return (
    <div className="movie-details">
      <Container>
        <Row>
          <Col xs={12} md={4} className="movie-poster">
            <img 
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movie;