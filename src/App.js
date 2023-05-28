import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header/Header'
import MovieList from './Components/Movie/MovieList/MovieList';
import Movie from './Components/Movie/MovieDetails/Movie';

function App() {
  return (
    <BrowserRouter>
      <> 
        <Header />
        <Routes>
          <Route exact path="/" element={<MovieList />}></Route>
          <Route path="/movie/:id" element={<Movie />}></Route>
        </Routes>
      </>
    </BrowserRouter> 
  );
}

export default App;
