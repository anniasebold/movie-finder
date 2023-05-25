import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Search from "../Search/Search";
import './Header.css'

function HeaderBootstrap() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container className="navbar">
        <Nav className="nav-links" id="nav-logo">
          <Navbar.Brand href="#">Movie Finder</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav>
          <Search />
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav" className="custom-collapse">
          <Nav className="nav-links justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#watchlist" className="custom-link me-2">Watchlist</Nav.Link>
            <Nav.Link href="https://github.com/anniasebold/movie-finder" target="_blank" className="custom-link me-4">
              Github
            </Nav.Link>
            <Button href="#login" variant="danger">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default HeaderBootstrap;