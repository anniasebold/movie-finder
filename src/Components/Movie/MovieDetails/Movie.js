import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4';
const language = 'pt-BR';

function Movie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`
        );

        setMovie(response.data);
      } catch(e) {
        console.error(e);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if(!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>

    </Container>
  );
}

export default Movie;