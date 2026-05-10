import axios from 'axios';
import { API_KEY} from '@env';

export const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',

  params: {
    key: API_KEY,
    lang: 'pt',
  },
});