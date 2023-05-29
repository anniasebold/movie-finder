import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Search from "../Search/Search";
import './Header.scss'
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" id="navbar" fixed="top">
      <Container>
        <Nav id="nav-logo">
          <Link id="nav-links" to="/">
            <Navbar.Brand>Movie Finder</Navbar.Brand>
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
                Movie Finder
              </Link>
            </Nav.Link>
            <Nav.Link className="me-2">
              <Link id="nav-links" to="/watchlist">
                Watchlist
              </Link>
            </Nav.Link>
            <Nav.Link href="https://github.com/anniasebold/movie-finder" target="_blank" className="me-4">
              Github
            </Nav.Link>
            <Link id="nav-links" to="/login">
              <Button variant="danger">
                Login
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;