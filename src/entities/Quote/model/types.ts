export interface QuoteResponse {
  quoteText: string;
  username: string;
  creationDate: string;
}

export interface CreateQuoteRequest {
  quoteText: string;
}

export interface GetQuotesRequest {
  offset: number;
  limit: number;
}

export interface QuoteWithId extends QuoteResponse {
  id?: number;
}

export interface QuotesListResponse {
  quotes: QuoteResponse[];
  totalCount: number;
  hasMore: boolean;
}