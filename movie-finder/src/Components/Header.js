import './Header.css'

function Header() {
  return (
    <nav>
        <div class="logo"><img src="../../../" alt="Logo"></img></div>
        <ul class="nav-list">
          <li>
            <input class="input-search" type="search" placeholder="Search" aria-label="Search">
            </input>
          </li>
        </ul>
          <div><a href="/">Watchlist</a></div>
          <div><a href="/">Github</a></div>
        <button class="login">Login</button>
    </nav>
  );
}

export default Header;