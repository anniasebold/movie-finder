import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.scss';

function Search() {
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    if(inputSearch.length > 0) {
      navigate(`/search?movies=${inputSearch}`, { replace: true });
    }
  };

  const handleChange = (event) => {
    setInputSearch(event.target.value);
  };

  return (
    <>
      <div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Digite o nome do filme"
            className="me-2"
            aria-label="Search"
            id="form-search"
            onChange={handleChange}
          />
          <Button variant="success" onClick={handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Search;