import MovieList from "./MovieList";
import { useLocation } from 'react-router-dom';

function SearchMovie() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('movies');
  console.log(searchQuery);

  return <MovieList movieSearch={searchQuery} />;
}

export default SearchMovie;