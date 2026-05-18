import { api } from '@/shared/api/axiosInstance';
import type { QuoteResponse, CreateQuoteRequest, GetQuotesRequest } from '../model/types';

export const quotesApi = {
  // Получить случайную цитату
  getRandom: async (): Promise<QuoteResponse> => {
    const response = await api.get('/api/Quote/GetRand');
    return response.data;
  },

  // Получить список цитат с пагинацией
  getList: async (offset: number = 0, limit: number = 10): Promise<QuoteResponse[]> => {
    const response = await api.get(`/api/Quote/${offset}/${limit}`);
    return response.data;
  },

  // Создать новую цитату
  create: async (data: CreateQuoteRequest): Promise<void> => {
    await api.post('/api/Quote', null, { params: { quoteText: data.quoteText } });
  },

  // Удалить цитату (если нужно)
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/Quote/${id}`);
  },
};