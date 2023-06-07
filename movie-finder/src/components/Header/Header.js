import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Search from "../../pages/Search/Search";
import './Header.scss'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilm, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" id="navbar" fixed="top">
      <Container>
        <Nav id="nav-logo">
          <Link id="nav-links" to="/">
            <img id="logo" src={logo} alt="logo Movie Finder" />
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav>
          <Search />
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav" className="custom-collapse">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link id="logo-collapse" className="me-2">
              <Link id="nav-links" to="/">
                <FontAwesomeIcon icon={faVideo} className="icon-video" />
                Movie Finder
              </Link>
            </Nav.Link>
            <Nav.Link className="me-2">
              <Link id="nav-links" to="/watchlist">
                <FontAwesomeIcon icon={faFilm} className="icon-watchlist" />
                Watchlist
              </Link>
            </Nav.Link>
            <Nav.Link href="https://github.com/anniasebold/movie-finder" target="_blank" className="me-4">
              <FontAwesomeIcon icon={faGithub} className="icon-github" alt="icone github" />
            </Nav.Link>
            <Link id="nav-links" to="/login">
              <Button variant="danger">Login</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;