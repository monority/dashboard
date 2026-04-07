export interface FetchUrlRequest {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string;
  timestamp: number;
}

export interface FetchUrlResponse {
  id: string;
  request: FetchUrlRequest;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  duration: number;
  timestamp: number;
  size: number;
}

export interface FetchUrlHistoryItem {
  request: FetchUrlRequest;
  response: FetchUrlResponse;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestTab {
  method: HttpMethod;
  url: string;
  headers: Array<{ key: string; value: string; enabled: boolean }>;
  body: string;
}

export interface ResponseTab {
  status: number;
  statusText: string;
  time: number;
  size: number;
  headers: Array<{ key: string; value: string }>;
  body: string;
  contentType: string;
}
