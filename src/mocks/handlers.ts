/**
 * Mock Service Worker handlers for API requests
 * These intercept HTTP requests and return mock data for testing
 */

import { http, HttpResponse } from 'msw';

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

// Base URL for API (matches your backend)
const API_BASE_URL = 'http://localhost:3000/api';

// Mock data generators
export const mockHandlers = {
  // Task endpoints
  tasks: [
    {
      id: 'task-1',
      title: 'Review dashboard design',
      description: 'Review the latest dashboard UI mockups',
      status: 'pending',
      priority: 'high',
      dueDate: '2026-04-10',
      assignee: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://api.example.com/avatars/john.png',
      },
      tags: ['design', 'ui'],
      createdAt: '2026-04-01T10:00:00Z',
      updatedAt: '2026-04-02T15:00:00Z',
    },
    {
      id: 'task-2',
      title: 'Fix login validation',
      description: 'Fix email validation on login form',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-04-05',
      assignee: {
        id: 'user-2',
        name: 'Jane Smith',
        avatar: 'https://api.example.com/avatars/jane.png',
      },
      tags: ['bug', 'auth'],
      createdAt: '2026-03-30T09:00:00Z',
      updatedAt: '2026-04-02T10:30:00Z',
    },
    {
      id: 'task-3',
      title: 'Update documentation',
      description: 'Update API documentation for new endpoints',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-04-08',
      assignee: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://api.example.com/avatars/john.png',
      },
      tags: ['docs'],
      createdAt: '2026-03-25T14:00:00Z',
      updatedAt: '2026-04-01T12:00:00Z',
    },
  ],

  users: [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://api.example.com/avatars/john.png',
      role: 'admin',
      status: 'active',
      joinDate: '2025-01-15',
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://api.example.com/avatars/jane.png',
      role: 'editor',
      status: 'active',
      joinDate: '2025-02-20',
    },
  ],

  orders: [
    {
      id: 'order-1',
      orderNumber: '#ORD-2026-001',
      customer: { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
      status: 'processing',
      total: 15999,
      tax: 1799,
      items: 3,
      date: '2026-04-02T10:00:00Z',
      shippingDate: null,
    },
    {
      id: 'order-2',
      orderNumber: '#ORD-2026-002',
      customer: { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' },
      status: 'delivered',
      total: 8999,
      tax: 999,
      items: 2,
      date: '2026-03-28T14:30:00Z',
      shippingDate: '2026-04-01T08:00:00Z',
    },
  ],

  mail: [
    {
      id: 'mail-1',
      from: { name: 'Support Team', email: 'support@example.com' },
      subject: 'Welcome to Dashboard',
      preview: 'Thanks for signing up. Here are your next steps...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2026-04-01T10:00:00Z',
      read: true,
      starred: false,
    },
    {
      id: 'mail-2',
      from: { name: 'Billing', email: 'billing@example.com' },
      subject: 'Invoice #INV-001',
      preview: 'Your monthly invoice is ready...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2026-03-30T14:00:00Z',
      read: false,
      starred: true,
    },
  ],

  reviews: [
    {
      id: 'review-1',
      author: {
        id: 'user-2',
        name: 'Jane Smith',
        avatar: 'https://api.example.com/avatars/jane.png',
      },
      rating: 5,
      title: 'Excellent product!',
      content: 'Very happy with this purchase. Highly recommend!',
      date: '2026-04-01T12:00:00Z',
      helpful: 42,
    },
    {
      id: 'review-2',
      author: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://api.example.com/avatars/john.png',
      },
      rating: 4,
      title: 'Good quality',
      content: 'Good product, could use better documentation.',
      date: '2026-03-28T09:30:00Z',
      helpful: 18,
    },
  ],
};

/**
 * MSW request handlers
 * These intercept API calls and return mock responses
 */
export const handlers = [
  // GET tasks
  http.get(`${API_BASE_URL}/tasks`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    let tasks = mockHandlers.tasks;
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    return HttpResponse.json({
      data: tasks.slice(0, parseInt(limit)),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: tasks.length,
      },
    });
  }),

  // GET single task
  http.get(`${API_BASE_URL}/tasks/:id`, ({ params }) => {
    const task = mockHandlers.tasks.find((t) => t.id === params.id);
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return HttpResponse.json({ data: task });
  }),

  // POST create task
  http.post(`${API_BASE_URL}/tasks`, async ({ request }) => {
    const body = await request.json();
    const payload = isPlainObject(body) ? body : {};

    const newTask = {
      id: `task-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json({ data: newTask }, { status: 201 });
  }),

  // PUT update task
  http.put(`${API_BASE_URL}/tasks/:id`, async ({ params, request }) => {
    const task = mockHandlers.tasks.find((t) => t.id === params.id);
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    const body = await request.json();
    const payload = isPlainObject(body) ? body : {};
    const updated = { ...task, ...payload, updatedAt: new Date().toISOString() };
    return HttpResponse.json({ data: updated });
  }),

  // DELETE task
  http.delete(`${API_BASE_URL}/tasks/:id`, ({ params }) => {
    const task = mockHandlers.tasks.find((t) => t.id === params.id);
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return HttpResponse.json({ success: true });
  }),

  // GET users
  http.get(`${API_BASE_URL}/users`, () => {
    return HttpResponse.json({
      data: mockHandlers.users,
    });
  }),

  // GET orders
  http.get(`${API_BASE_URL}/orders`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    return HttpResponse.json({
      data: mockHandlers.orders.slice(0, parseInt(limit)),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: mockHandlers.orders.length,
      },
    });
  }),

  // GET mail
  http.get(`${API_BASE_URL}/mail`, () => {
    return HttpResponse.json({
      data: mockHandlers.mail,
    });
  }),

  // GET reviews
  http.get(`${API_BASE_URL}/reviews`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    return HttpResponse.json({
      data: mockHandlers.reviews.slice(0, parseInt(limit)),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: mockHandlers.reviews.length,
      },
    });
  }),

  // Auth endpoints
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();
    const email = isPlainObject(body) && typeof body.email === 'string' ? body.email : '';
    const password = isPlainObject(body) && typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }
    return HttpResponse.json({
      data: {
        user: mockHandlers.users[0],
      },
    });
  }),

  http.post(`${API_BASE_URL}/auth/logout`, () => {
    return HttpResponse.json({ success: true });
  }),

  // Health check
  http.get(`${API_BASE_URL}/health`, () => {
    return HttpResponse.json({ status: 'ok' });
  }),
];
