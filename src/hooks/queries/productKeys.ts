// Product Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...productKeys.lists(), filters] as const,
  search: (query: string, filters?: Record<string, unknown>) =>
    [...productKeys.all, 'search', query, filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
};
