import { apiClient } from "api/client"
import { ENDPOINTS } from "constants/endpoints"
import qs from "qs"
import type { ApiResponse } from "shared/interface/apiResponse.interface"
import type {
  IProduct,
  IProductToList,
} from "shared/interface/product.interface"

const PAGE_SIZE = 9

export async function getProducts(page: number, pageSize: number = PAGE_SIZE) {
  const queryParams = {
    populate: ["images", "productCategory"],
    pagination: {
      page: page,
      pageSize: pageSize,
    },
  }
  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
  })

  const { data } = await apiClient.get<ApiResponse<IProductToList[]>>(
    `${ENDPOINTS.product.list()}?${queryString}`
  )

  return data
}

export async function getProductById(id: string) {
  const queryParams = {
    populate: ["images", "productCategory"],
  }

  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
  })

  const { data } = await apiClient.get<ApiResponse<IProduct>>(
    `${ENDPOINTS.product.byId(id)}?${queryString}`
  )

  return data
}

export async function getProductsByCategory(
  categoryId: number,
  pageSize: number = PAGE_SIZE
) {
  const queryParams = {
    populate: ["images", "productCategory"],
    pagination: {
      pageSize: pageSize,
    },
    filters: {
      productCategory: {
        id: {
          $eq: categoryId,
        },
      },
    },
  }
  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
  })

  const { data } = await apiClient.get<ApiResponse<IProductToList[]>>(
    `${ENDPOINTS.product.list()}?${queryString}`
  )

  return data
}
