import './Search.css'
import { Input } from "reactstrap";

function Search() {
  return (
    <div>
      <Input 
        className="input-search" 
        type="search" 
        placeholder="Digite o nome do filme para pesquisar" 
        aria-label="Search"
      />
      <i className="fas fa-search search-btn" />
    </div>
  );
}

export default Search;