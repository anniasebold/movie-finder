import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import MovieList from './pages/Movie/MovieList/MovieList';
import Movie from './pages/Movie/MovieDetails/Movie';
import Error from './components/Error/Error';
import MovieSearch from './pages/Movie/MovieList/MovieSearch';
import './App.scss';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'

function App() {
  return (
    <BrowserRouter>
      <> 
        <Header />
        <Routes>
          <Route exact path="/" element={<MovieList />}></Route>
          <Route path="/movie/:id" element={<Movie />}></Route>
          <Route path="/search" element={<MovieSearch />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </>
    </BrowserRouter> 
  );
}

export default App;
