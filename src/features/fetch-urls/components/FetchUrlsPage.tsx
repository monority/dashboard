import { useState } from 'react';

import { Card, Button, Input } from '@/components/ui';

import { useFetchUrls } from '../hooks/useFetchUrls';
import type { HttpMethod } from '../types';
import './fetch-urls.css';

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export function FetchUrlsPage() {
  const { execute, response, isLoading, error, history, clearHistory } = useFetchUrls();
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [body, setBody] = useState('');

  const handleSubmit = (e: import('react').FormEvent) => {
    e.preventDefault();
    if (url) {
      execute(url, method, body || undefined);
    }
  };

  const suggestedUrls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/users',
    'https://httpbin.org/post',
  ];

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 400 && status < 500) return 'warning';
    if (status >= 500) return 'danger';
    return 'info';
  };

  return (
    <section className="fetch-urls-page">
      <header className="page-header">
        <h1>Fetch URLs</h1>
        <p>Testez des requêtes HTTP et visualisez les réponses en temps réel</p>
      </header>

      <div className="fetch-grid">
        <Card className="request-panel">
          <h3>Requête</h3>
          <form onSubmit={handleSubmit} className="request-form">
            <div className="method-url-row">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="method-select"
              >
                {HTTP_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="url-input"
                required
              />
            </div>

            {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
              <div className="body-field">
                <label htmlFor="request-body">Body (JSON)</label>
                <textarea
                  id="request-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={4}
                />
              </div>
            )}

            <div className="suggested-urls">
              <span>Suggestions:</span>
              {suggestedUrls.map((u) => (
                <button key={u} type="button" className="suggested-btn" onClick={() => setUrl(u)}>
                  {u.replace('https://', '').split('/')[0]}
                </button>
              ))}
            </div>

            <Button type="submit" disabled={isLoading || !url} className="send-btn">
              {isLoading ? 'Envoi...' : 'Envoyer'}
            </Button>
          </form>
        </Card>

        <Card className="response-panel">
          <h3>Réponse</h3>
          {error && (
            <div className="response-error">
              <span className="error-icon">⚠️</span>
              <p>{error.message}</p>
            </div>
          )}

          {response && !error && (
            <div className="response-content">
              <div className="response-meta">
                <span className={`status-badge ${getStatusColor(response.status)}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="meta-item">⏱️ {response.duration}ms</span>
                <span className="meta-item">📦 {formatBytes(response.size)}</span>
              </div>

              <div className="response-headers">
                <h4>Headers</h4>
                <div className="headers-list">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key} className="header-item">
                      <span className="header-key">{key}:</span>
                      <span className="header-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="response-body">
                <h4>Body</h4>
                <pre className="body-content">
                  {(() => {
                    try {
                      return JSON.stringify(JSON.parse(response.body), null, 2);
                    } catch {
                      return response.body;
                    }
                  })()}
                </pre>
              </div>
            </div>
          )}

          {!response && !error && (
            <div className="response-empty">
              <span className="empty-icon">🌐</span>
              <p>Envoyez une requête pour voir la réponse</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="history-panel">
        <div className="history-header">
          <h3>Historique</h3>
          {history.length > 0 && (
            <Button variant="ghost" onClick={clearHistory}>
              Effacer
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="history-empty">Aucun historique</p>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <button
                key={item.id}
                className="history-item"
                onClick={() => {
                  setUrl(item.request.url);
                  setMethod(item.request.method);
                  setBody(item.request.body || '');
                }}
              >
                <span className={`method-tag ${item.request.method.toLowerCase()}`}>
                  {item.request.method}
                </span>
                <span className="history-url">{item.request.url}</span>
                <span className={`history-status ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <span className="history-time">{formatTime(item.timestamp)}</span>
              </button>
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}
