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