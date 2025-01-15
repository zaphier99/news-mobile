import axios, { AxiosResponse } from 'axios';
import { NEWS_API_BASE_URL, NEWS_API_KEY } from '@env'

const BASE_URL = NEWS_API_BASE_URL;
const API_KEY = NEWS_API_KEY;


interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const newsApiService = {
  /**
   * Fetch top headlines.
   * @param params Query parameters like `country`, `category`, or `q`.
   * @returns Promise with the news articles.
   */
  fetchTopHeadlines: async (params: Record<string, string> = {}): Promise<NewsArticle[]> => {
    try {
      const response: AxiosResponse<NewsResponse> = await axios.get(`${BASE_URL}/top-headlines`, {
        params: { apiKey: API_KEY, ...params },
      });
      
      if (response.data.status !== 'ok') {
        throw new Error('Failed to fetch news');
      }

      return response.data.articles;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  },

  /**
   * Fetch everything (all news articles based on a query).
   * @param params Query parameters like `q`, `from`, `to`, or `language`.
   * @returns Promise with the news articles.
   */
  fetchEverything: async (params: Record<string, string> = {}): Promise<NewsArticle[]> => {
    try {
      const response: AxiosResponse<NewsResponse> = await axios.get(`${BASE_URL}/everything`, {
        params: { apiKey: API_KEY, ...params },
      });
      
      if (response.data.status !== 'ok') {
        throw new Error('Failed to fetch news');
      }

      return response.data.articles;
    } catch (error) {
      console.error('Error fetching everything:', error);
      throw error;
    }
  },
};

export default newsApiService;