import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
});

export const getNewDeck = async () => {
  const response = await apiClient.get('/new/shuffle/?deck_count=1');;
  return response.data;
};

export const drawCards = async (deckId, count) => {
  const response = await apiClient.get(`/${deckId}/draw/?count=${count}`);
  return response.data;
};
