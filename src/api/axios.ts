import axios, { AxiosError } from "axios"
import type { ApiErrorResponse } from "shared/interface/apiResponse.interface"

const STRAPI_BASE_URL = "https://front-school-strapi.ktsdev.ru"
const STRAPI_URL = `${STRAPI_BASE_URL}/api`

const TOKEN = import.meta.env.VITE_STRAPI_TOKEN

export const apiClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    ...(TOKEN && {
      Authorization: `Bearer ${TOKEN}`,
    }),
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message =
      error.response?.data?.error?.message || error.message || "Unknown error"

    return Promise.reject(new Error(message))
  }
)
