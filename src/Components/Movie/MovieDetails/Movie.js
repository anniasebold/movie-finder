import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

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
    console.log("Carregando...");
    return <div>Carregando...</div>
  };

  if(!movie) {
    console.log("Filme não encontrado.");
    return <h2>Filme não encontrado.</h2>
  };

  return (
    <Container>
      <h2>{movie.title}</h2>
    </Container>
  );
}

export default Movie;