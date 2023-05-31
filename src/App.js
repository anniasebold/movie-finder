import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header'
import MovieList from './Components/Movie/MovieList/MovieList';
import Movie from './Components/Movie/MovieDetails/Movie';
import Error from './Components/Error/Error';
import MovieSearch from './Components/Movie/MovieList/MovieSearch';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <> 
        <Header />
        <Routes>
          <Route exact path="/" element={<MovieList />}></Route>
          <Route path="/movie/:id" element={<Movie />}></Route>
          <Route path="/search" element={<MovieSearch />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </>
    </BrowserRouter> 
  );
}

export default App;
