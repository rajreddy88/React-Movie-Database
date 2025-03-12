import { useEffect, useState } from "react";
import { IMovie } from "../models/IMovies";

function MoviesList(){
    const [data, setData] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        () => {
            getMoviesData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const params = {
                      s: "Movie",
                      page: "1",
                      apikey: API_KEY,
                    };
            }
        }
    )
}