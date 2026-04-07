import type { FetchUrlResponse, FetchUrlRequest } from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () => crypto.randomUUID();

const detectContentType = (body: string): string => {
  try {
    JSON.parse(body);
    return 'application/json';
  } catch {
    return 'text/plain';
  }
};

const formatSize = (body: string): number => {
  return new Blob([body]).size;
};

const MOCK_ENDPOINTS: Record<string, { status: number; body: string; delay?: number }> = {
  'https://jsonplaceholder.typicode.com/posts/1': {
    status: 200,
    body: JSON.stringify({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }),
  },
  'https://jsonplaceholder.typicode.com/users': {
    status: 200,
    body: JSON.stringify([
      { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
      { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
    ]),
  },
  'https://httpbin.org/status/500': {
    status: 500,
    body: JSON.stringify({ error: 'Internal Server Error' }),
  },
  'https://httpbin.org/delay/2': {
    status: 200,
    body: JSON.stringify({ message: 'Delayed response' }),
    delay: 2000,
  },
  'https://httpbin.org/post': {
    status: 200,
    body: JSON.stringify({ json: null, url: 'https://httpbin.org/post', origin: '127.0.0.1' }),
  },
};

const isMockEndpoint = (url: string): boolean => {
  return Object.keys(MOCK_ENDPOINTS).includes(url);
};

const getMockResponse = (
  url: string,
): { status: number; body: string; delay?: number } | undefined => {
  return MOCK_ENDPOINTS[url];
};

const generateRandomJson = (): string => {
  const data = {
    id: generateId(),
    timestamp: Date.now(),
    data: {
      user: 'John Doe',
      email: 'john@example.com',
      roles: ['admin', 'user'],
      settings: {
        theme: 'dark',
        notifications: true,
        language: 'fr',
      },
      items: Array.from({ length: 5 }, (_, i) => ({ id: i, name: `Item ${i}` })),
    },
  };
  return JSON.stringify(data, null, 2);
};

export const fetchUrlsService = {
  async execute(request: FetchUrlRequest): Promise<FetchUrlResponse> {
    const startTime = performance.now();
    const delay = request.method === 'GET' ? Math.random() * 300 + 100 : Math.random() * 500 + 200;
    await wait(delay);

    const isMock = isMockEndpoint(request.url);
    let status = 200;
    let body = '';
    let responseDelay: number | undefined;

    if (isMock) {
      const mock = getMockResponse(request.url)!;
      status = mock.status;
      body = mock.body;
      responseDelay = mock.delay;
    } else if (request.url.startsWith('https://') || request.url.startsWith('http://')) {
      if (request.method === 'GET') {
        body = generateRandomJson();
        status = 200;
      } else if (request.body) {
        body = request.body;
        status = 201;
      } else {
        body = JSON.stringify({ success: true, message: 'Request processed' });
        status = 200;
      }
    } else {
      body = JSON.stringify({ error: 'Invalid URL format' });
      status = 400;
    }

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime + (responseDelay || 0));

    return {
      id: generateId(),
      request,
      status,
      statusText:
        status === 200
          ? 'OK'
          : status === 201
            ? 'Created'
            : status === 400
              ? 'Bad Request'
              : status === 500
                ? 'Internal Server Error'
                : 'Unknown',
      headers: {
        'content-type': detectContentType(body),
        'cache-control': 'no-cache',
        'x-response-time': `${duration}ms`,
      },
      body,
      duration,
      timestamp: Date.now(),
      size: formatSize(body),
    };
  },

  getHistory(): FetchUrlResponse[] {
    const stored = localStorage.getItem('fetch-urls-history');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  },

  saveToHistory(response: FetchUrlResponse): void {
    const history = this.getHistory();
    const updated = [response, ...history].slice(0, 50);
    localStorage.setItem('fetch-urls-history', JSON.stringify(updated));
  },

  clearHistory(): void {
    localStorage.removeItem('fetch-urls-history');
  },

  getSuggestedUrls(): string[] {
    return [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/users',
      'https://httpbin.org/status/500',
      'https://httpbin.org/delay/2',
      'https://httpbin.org/post',
    ];
  },
};
