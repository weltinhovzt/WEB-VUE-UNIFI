import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    }
})