import MovieList from "./MovieList";
import { useLocation } from 'react-router-dom';

function MovieSearch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('movies');

  return <MovieList movieSearch={searchQuery} />;
}

export default MovieSearch;