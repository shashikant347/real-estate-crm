import axios from "axios";

const API = axios.create({
  baseURL: "https://real-estate-crm-6hqy.onrender.com/api"
});

export default API;