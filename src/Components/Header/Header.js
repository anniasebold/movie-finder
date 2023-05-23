import './Header.css'
import items from '../../assets/svgs';
import { Button } from 'reactstrap';
import SearchMovie from '../Search/Search'

function Header() {
  return (
    <div className='navbar'>
        <div className="logo">
          <img src="/movie-finder/src/assets/logo.png" alt="Logo" />
        </div>
        <SearchMovie />
        <div className='links-nav'>
          <a href="https://www.google.com.br/">Watchlist</a>
        </div>
        <div className='links-nav'>
          <a 
            href="https://github.com/anniasebold/movie-finder" 
            target='blank'
          > {items.github_logo}
          </a>
        </div>
        <div>
          <Button color='danger' className="btn-round btn-sign">
            Login
          </Button>
        </div>
    </div>
  );
}

export default Header;