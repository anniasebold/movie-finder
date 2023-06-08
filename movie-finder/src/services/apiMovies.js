import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

const API_KEY = 'bf74bdfa989ad758eb544fbbde7650e4';

const language = 'pt-BR';

export { api, API_KEY, language};