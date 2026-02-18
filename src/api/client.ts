import axios from "axios"

const STRAPI_BASE_URL = "https://front-school-strapi.ktsdev.ru"
const STRAPI_URL = `${STRAPI_BASE_URL}/api`

const TOKEN = import.meta.env.VITE_STRAPI_TOKEN ?? "your_strapi_token"

export const apiClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
})
