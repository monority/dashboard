import { beforeEach, describe, expect, it, vi } from 'vitest';

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({ render: renderMock }));

vi.mock('react-dom/client', () => ({
  default: { createRoot: createRootMock },
  createRoot: createRootMock,
}));

vi.mock('./Root', () => ({
  default: () => <div>Root component</div>,
}));

describe('Main bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    renderMock.mockClear();
    createRootMock.mockClear();
    vi.resetModules();
  });

  it('monte Root via ReactDOM.createRoot', async () => {
    await import('./Main');

    const rootElement = document.getElementById('root');
    expect(createRootMock).toHaveBeenCalledWith(rootElement);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
