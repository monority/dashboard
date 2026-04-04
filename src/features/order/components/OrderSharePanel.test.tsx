import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks', () => ({
  useToast: vi.fn(() => ({ notify: vi.fn() })),
}));

import { useToast } from '@/hooks';

import { OrderSharePanel } from './OrderSharePanel';

const DEFAULT_URL = 'https://example.com/doc/42';

const renderPanel = (props: { initialUrl?: string; isLoading?: boolean } = {}) =>
  render(
    <OrderSharePanel
      initialUrl={props.initialUrl ?? DEFAULT_URL}
      isLoading={props.isLoading ?? false}
    />,
  );

describe('OrderSharePanel', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('affiche le titre et la description', () => {
    renderPanel();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Partager le document' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Toute personne disposant de ce lien peut consulter ce document.'),
    ).toBeInTheDocument();
  });

  it('affiche le champ avec l URL initiale', () => {
    renderPanel();
    expect(screen.getByDisplayValue(DEFAULT_URL)).toBeInTheDocument();
  });

  it('desactive le champ et le bouton en etat de chargement', () => {
    renderPanel({ isLoading: true });
    expect(screen.getByRole('textbox', { name: /URL du document/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Copier le lien/i })).toBeDisabled();
  });

  it('appelle notify avec l URL courante au clic', async () => {
    const notify = vi.fn();
    vi.mocked(useToast).mockReturnValue({ notify } as unknown as ReturnType<typeof useToast>);
    renderPanel();
    await userEvent.click(screen.getByRole('button', { name: /Copier le lien/i }));
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({ description: DEFAULT_URL, variant: 'success' }),
    );
  });

  it('appelle notify avec l URL modifiee', async () => {
    const notify = vi.fn();
    vi.mocked(useToast).mockReturnValue({ notify } as unknown as ReturnType<typeof useToast>);
    renderPanel();
    const input = screen.getByRole('textbox', { name: /URL du document/i });
    await userEvent.clear(input);
    await userEvent.type(input, 'https://new.example.com/doc');
    await userEvent.click(screen.getByRole('button', { name: /Copier le lien/i }));
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'https://new.example.com/doc' }),
    );
  });

  it('desactive le bouton quand l URL est vide', async () => {
    renderPanel();
    const input = screen.getByRole('textbox', { name: /URL du document/i });
    await userEvent.clear(input);
    expect(screen.getByRole('button', { name: /Copier le lien/i })).toBeDisabled();
  });
});
