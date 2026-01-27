import type {
  Category,
  GetProductsParams,
  Product,
  ProductsResponse,
  SearchProductsParams,
} from '../types/product';
import { apiClient } from './client';

const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;

/**
 * Centralized query builder for product list endpoints
 */
const buildProductsQuery = ({
  limit = DEFAULT_LIMIT,
  skip = DEFAULT_SKIP,
  select,
}: GetProductsParams = {}) => ({
  limit,
  skip,
  ...(select && { select: select.join(',') }),
});

export const productsApi = {
  /**
   * Get all products with pagination
   * GET /products?limit=20&skip=0
   */
  getAll: async (params?: GetProductsParams): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: buildProductsQuery(params),
      signal: params?.signal, // For request cancellation
    });

    return response.data;
  },

  /**
   * Get single product by ID
   * GET /products/:id
   */
  getById: async (id: string | number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  /**
   * Search products by query
   * GET /products/search?q=phone&limit=20&skip=0
   */
  search: async (params: SearchProductsParams): Promise<ProductsResponse> => {
    const { query, ...rest } = params;

    const response = await apiClient.get<ProductsResponse>('/products/search', {
      params: {
        q: query,
        ...buildProductsQuery(rest),
      },
      signal: params?.signal, // For request cancellation
    });

    return response.data;
  },

  /**
   * Get products by category
   * GET /products/category/:category?limit=20&skip=0
   */
  getByCategory: async (
    category: string,
    params?: GetProductsParams,
  ): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}`,
      {
        params: buildProductsQuery(params),
        signal: params?.signal, // For request cancellation
      },
    );

    return response.data;
  },

  /**
   * Get all categories
   * GET /products/categories
   */
  getCategories: async (signal?: AbortSignal): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/products/categories', {
      signal,
    });
    return response.data;
  },

  /**
   * Get category list (just slugs)
   * GET /products/category-list
   */
  getCategoryList: async (signal?: AbortSignal): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/products/category-list', {
      signal,
    });
    return response.data;
  },
};
