import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import MovieList from './pages/Movie/MovieList/MovieList';
import Movie from './pages/Movie/MovieDetails/Movie';
import Error from './components/Error/Error';
import MovieSearch from './pages/Movie/MovieList/MovieSearch';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'
import { AuthProvider } from './context/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.scss';
import Watchlist from './pages/Watchlist/Watchlist';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<MovieList />}/>
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/search" element={<MovieSearch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Error />} />
              <Route 
                path="/watchlist"
                element={
                  <PrivateRoute>
                    <Watchlist />
                  </PrivateRoute>
                }
              />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
