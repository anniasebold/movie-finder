import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { getWatchlistByUser } from "../services/apiFirebase";

export const WatchlistContext =  createContext();
export const UpdateWatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistByUser = await getWatchlistByUser(currentUser.uid);
        setWatchlist(watchlistByUser);
      } catch(e) {
        console.error("Erro ao obter a Watchlist: ", e);
      };
    };

    if(currentUser) {
      fetchWatchlist();
    }
    
  }, [currentUser]);

  const updateWatchlist = (newWatchlist) => {
    setWatchlist(newWatchlist);
  }

  return (
    <WatchlistContext.Provider value={watchlist}>
      <UpdateWatchlistContext.Provider value={updateWatchlist}>
        {children}
      </UpdateWatchlistContext.Provider>
    </WatchlistContext.Provider>
  );
};