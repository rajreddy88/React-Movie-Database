import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/movies/MoviesList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
      </Routes>
    </Router>
  );
};

export default App;
