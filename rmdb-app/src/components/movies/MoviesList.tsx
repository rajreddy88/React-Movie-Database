import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Container } from "react-bootstrap";

import { useNavigate, useSearchParams } from "react-router-dom";
import { IMovie } from "../../models/IMovies";

const API_KEY = "96d1961b";
const BASE_URL = "http://www.omdbapi.com/";

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("s") || "american";
  const page = Number(searchParams.get("p")) || 1;
  const type = searchParams.get("type") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(BASE_URL, {
          params: { s: search, page, type, apikey: API_KEY },
        });
        if (response.data.Response === "True") {
          setMovies(response.data.Search || []);
          setTotalResults(Number(response.data.totalResults) || 0);
          setStatus("succeeded");
        } else {
          setMovies([]);
          setTotalResults(0);
          setStatus("failed");
          setError(response.data.Error);
        }
      } catch (err) {
        setStatus("failed");
        setError("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [search, page, type]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearch = formData.get("search") as string;
    navigate(`/?s=${newSearch}&p=1&type=${type}`);
  };

  const handleTypeChange = (newType: string) => {
    navigate(`/?s=${search}&p=1&type=${newType}`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?s=${search}&p=${newPage}&type=${type}`);
  };

  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">RMDB</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <form onSubmit={handleSearch}>
              <input name="search" defaultValue={search} />
              <button type="submit">Search</button>
            </form>

          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div>
      <div>
        <button onClick={() => handleTypeChange("")}>ANY</button>
        <button onClick={() => handleTypeChange("movie")}>Movies</button>
        <button onClick={() => handleTypeChange("series")}>Series</button>
        <button onClick={() => handleTypeChange("episode")}>Episodes</button>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && (
        <>
          <p>Showing {movies.length} of {totalResults} results</p>
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} width="50" />
                {movie.Title} ({movie.Year}) - {movie.Type}
              </li>
            ))}
          </ul>

          <div>
            <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>« Prev</button>
            <span> Page {page} </span>
            <button disabled={page * 10 >= totalResults} onClick={() => handlePageChange(page + 1)}>Next »</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default MovieList;
