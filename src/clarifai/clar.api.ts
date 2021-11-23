import axios from 'axios'
const apiKey = process.env.YOUR_CLARIFAI_API_KEY


export const clar = axios.create({
  baseURL: "https://api.clarifai.com",
  headers: {
    'Accept': 'application/json',
    'Authorization': `Key ${apiKey}`
  }
});
