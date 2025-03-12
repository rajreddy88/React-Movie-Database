export interface IMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  export interface IFetchMoviesParams {
    search: string;
    page: number;
    type: string;
  }