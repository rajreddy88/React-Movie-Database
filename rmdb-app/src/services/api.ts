import axios from "axios";
import { IMovie } from "../models/IMovies";

const BASE_URL = 'http://www.omdbapi.com/'
const API_KEY = '96d1961b'

export const getMovies = async (params: Record<string, string>): Promise<IMovie> => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { apikey: API_KEY, ...params }, // Merge API key with user params
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  };
   