import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/features/settings/hooks', () => ({
  useSettings: vi.fn(),
}));

vi.mock('@/hooks', () => ({
  useToast: vi.fn(() => ({ notify: vi.fn() })),
}));

import { useSettings } from '@/features/settings/hooks';

import { SettingsPage } from './SettingsPage';

const makeHookState = (overrides: Record<string, unknown> = {}) =>
  ({
    data: undefined,
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
    saveSettings: {
      mutate: vi.fn(),
      isPending: false,
    },
    ...overrides,
  }) as unknown;

const renderPage = () => render(<SettingsPage />);

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.mocked(useSettings).mockReturnValue(makeHookState() as ReturnType<typeof useSettings>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('affiche le titre et la description de la page', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Parametres' })).toBeInTheDocument();
    expect(screen.getByText(/Gere les preferences/)).toBeInTheDocument();
  });

  it('affiche le skeleton en etat de chargement sans formulaire', () => {
    vi.mocked(useSettings).mockReturnValue(
      makeHookState({ isLoading: true }) as ReturnType<typeof useSettings>,
    );
    renderPage();
    expect(screen.queryByRole('button', { name: /Enregistrer/i })).not.toBeInTheDocument();
  });

  it('affiche les sections du formulaire apres chargement', () => {
    renderPage();
    expect(screen.getByText('Apparence')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('affiche les notifications comme activees par defaut', () => {
    renderPage();
    expect(screen.getByText('Activees')).toBeInTheDocument();
    expect(screen.getByText('Notifications actives')).toBeInTheDocument();
  });

  it('bascule les notifications au clic sur le bouton toggle', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Activees/i }));
    expect(screen.getByText('Desactivees')).toBeInTheDocument();
    expect(screen.getByText('Notifications coupees')).toBeInTheDocument();
  });

  it('appelle saveSettings.mutate a la soumission du formulaire', async () => {
    const mutate = vi.fn();
    vi.mocked(useSettings).mockReturnValue(
      makeHookState({ saveSettings: { mutate, isPending: false } }) as ReturnType<
        typeof useSettings
      >,
    );
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Enregistrer les modifications/i }));
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  it('desactive le bouton enregistrer pendant la sauvegarde', () => {
    vi.mocked(useSettings).mockReturnValue(
      makeHookState({ saveSettings: { mutate: vi.fn(), isPending: true } }) as ReturnType<
        typeof useSettings
      >,
    );
    renderPage();
    expect(screen.getByRole('button', { name: /Enregistrement/i })).toBeDisabled();
  });

  it('initialise les valeurs depuis les donnees du serveur', () => {
    vi.mocked(useSettings).mockReturnValue(
      makeHookState({ data: { theme: 'dark', notificationsEnabled: false } }) as ReturnType<
        typeof useSettings
      >,
    );
    renderPage();
    expect(screen.getByText('Desactivees')).toBeInTheDocument();
  });
});
