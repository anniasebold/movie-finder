import '../Header/Header.scss'
import { Form, Button } from "react-bootstrap";

function Search() {
  return (
    <>
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Digite o nome do filme"
          className="me-2"
          aria-label="Search"
        />
        <Button className="input-search" variant="success">Search</Button>
      </Form>
    </div>
    </>
  );
}

export default Search;