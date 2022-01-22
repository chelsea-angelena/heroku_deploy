import axios from 'axios';

const apiKey = process.env.YOUR_CLARIFAI_API_KEY;
console.log(apiKey);
export const clar = axios.create({
  baseURL: 'https://api.clarifai.com',
  headers: {
    Authorization: `Key ${apiKey}`,
    Accept: 'application/json',
  },
});
