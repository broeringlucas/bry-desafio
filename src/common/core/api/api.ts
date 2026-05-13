import axios from 'axios';
import { API_KEY} from '@env';
import { API_BASE_URL } from '../constants/api-url';

export const api = axios.create({
  baseURL: API_BASE_URL,

  params: {
    key: API_KEY,
    lang: 'pt',
  },
});