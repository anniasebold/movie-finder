import { addMovieWatchlist, getWatchlistByUser, removeMovieWatchlist } from '../../../services/apiFirebase';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/Auth';
import { UpdateWatchlistContext, WatchlistContext } from '../../../context/Watchlist';
import icons from "../../../assets/svgs"; 

function WatchlistButton({ movie }) {
  const [loading, setLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const watchlist = useContext(WatchlistContext);
  const updateWatchlist = useContext(UpdateWatchlistContext);

  useEffect(() => {
    const inWatchlist = async () => {
      const inWatchlist = watchlist.some(
        (item) => item.movie_id === movie.id && item.user_id === currentUser.uid
      );
      setIsInWatchlist(inWatchlist);
    };

    if(currentUser) {
      inWatchlist();
    }

  }, [movie, currentUser, watchlist]);

  async function addWatchlist() {
    if(!currentUser) {
      alert("É necessário estar logado para fazer isso.");
      return;
    };

    try {
      setLoading(true);
      await addMovieWatchlist(movie.id, currentUser.uid);
      updateWatchlist(await getWatchlistByUser(currentUser.uid));
      setLoading(false);
      setIsInWatchlist(true);
    } catch(e) {
      setLoading(false);
      console.log("Erro: " + e);
    }
  };

  async function removeWatchlist() {
    if(!currentUser) {
      alert("É necessário estar logado para fazer isso.");
      return;
    };
    
    try {
      setLoading(true);
      const [ doc ] = watchlist.filter((item) => item.movie_id === movie.id && item.user_id === currentUser.uid);
      await removeMovieWatchlist(doc.id);
      updateWatchlist(await getWatchlistByUser(currentUser.uid));
      setLoading(false);
      setIsInWatchlist(false);
    } catch(e) {
      console.log("Erro: " + e);
    }
  }

  return (
    <>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <Button 
          type="submit" 
          variant={!isInWatchlist ? "success" : "secondary"} 
          className="button-watchlist" 
          onClick={!isInWatchlist ? addWatchlist : removeWatchlist}
        >
          <i>{icons.bookmarkIcon}</i>
          {!isInWatchlist ? "Adicionar a " : "Remover da "}Watchlist
        </Button>
      )}
    </>
  )
}

export default WatchlistButton;