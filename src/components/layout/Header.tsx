import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
import { useGlobalSearch } from '@/hooks';
import { uiStore } from '@/stores';
import { APP_ROUTES } from '@/utils';

import { Breadcrumb } from './Breadcrumb';
import { LAYOUT_COPY, LAYOUT_ROUTE_LABELS } from './display';

const NAV_SHORTCUTS: Record<string, string> = {
  d: APP_ROUTES.dashboard,
  m: APP_ROUTES.mail,
  o: APP_ROUTES.order,
  t: APP_ROUTES.task,
  r: APP_ROUTES.reviews,
  s: APP_ROUTES.support,
  p: APP_ROUTES.settings,
};

export const Header = () => {
  const toggleSidebar = uiStore((state) => state.toggleSidebar);
  const navigate = useNavigate();
  const location = useLocation();
  const listboxId = useId();
  const searchStatusId = useId();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const pendingNavShortcutRef = useRef(false);
  const navShortcutTimerRef = useRef<number | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { results, isLoading } = useGlobalSearch(query);
  const searchResults = results.slice(0, 8);
  const activeDescendant = activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;
  const activeSectionLabel = LAYOUT_ROUTE_LABELS[location.pathname] ?? 'Tableau de bord';
  const searchStatusMessage = isLoading
    ? LAYOUT_COPY.searchLoading
    : query.trim()
      ? `${searchResults.length} resultat(s) disponible(s).`
      : LAYOUT_COPY.searchIdle;

  const handleNavigate = useCallback(
    (route: string) => {
      setIsOpen(false);
      setActiveIndex(-1);
      setQuery('');

      if (route !== `${location.pathname}${location.search}`) {
        navigate(route);
      }
    },
    [location.pathname, location.search, navigate],
  );

  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  useEffect(() => {
    if (!activeDescendant) {
      return;
    }

    const activeElement = document.getElementById(activeDescendant);
    activeElement?.scrollIntoView({ block: 'nearest' });
  }, [activeDescendant]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement | null)?.tagName.toLowerCase();
      const isTypingContext =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        (document.activeElement as HTMLElement | null)?.isContentEditable;

      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') {
        if (isTypingContext) {
          return;
        }

        const pressedKey = event.key.toLowerCase();

        if (pressedKey === 'g') {
          pendingNavShortcutRef.current = true;

          if (navShortcutTimerRef.current) {
            window.clearTimeout(navShortcutTimerRef.current);
          }

          navShortcutTimerRef.current = window.setTimeout(() => {
            pendingNavShortcutRef.current = false;
          }, 900);

          return;
        }

        if (pendingNavShortcutRef.current) {
          pendingNavShortcutRef.current = false;

          if (navShortcutTimerRef.current) {
            window.clearTimeout(navShortcutTimerRef.current);
          }

          const targetRoute = NAV_SHORTCUTS[pressedKey];

          if (targetRoute) {
            event.preventDefault();
            handleNavigate(targetRoute);
          }
        }

        return;
      }

      event.preventDefault();
      setIsOpen(true);
      searchInputRef.current?.focus();
    };

    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('keydown', handleShortcut);

      if (navShortcutTimerRef.current) {
        window.clearTimeout(navShortcutTimerRef.current);
      }
    };
  }, [handleNavigate]);

  const handleSubmit = () => {
    const activeResult = results[activeIndex] ?? results[0];

    if (activeResult) {
      handleNavigate(activeResult.route);
    }
  };

  return (
    <div className="app-header">
      <div className="app-header__left">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          aria-label="Ouvrir ou fermer la barre laterale"
        >
          Menu
        </Button>

        <Breadcrumb
          items={[
            { label: LAYOUT_COPY.workspace, to: APP_ROUTES.dashboard },
            { label: activeSectionLabel },
          ]}
        />
      </div>

      <div className="app-header__actions">
        <div
          className="app-header-search"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsOpen(false);
              setActiveIndex(-1);
            }
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            placeholder={LAYOUT_COPY.searchPlaceholder}
            aria-label="Recherche globale"
            role="combobox"
            aria-expanded={isOpen && searchResults.length > 0}
            aria-controls={listboxId}
            aria-activedescendant={activeDescendant}
            aria-autocomplete="list"
            onFocus={() => setIsOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
              }

              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setIsOpen(true);
                setActiveIndex((current) => {
                  if (searchResults.length === 0) {
                    return -1;
                  }

                  return current >= searchResults.length - 1 ? 0 : current + 1;
                });
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setIsOpen(true);
                setActiveIndex((current) => {
                  if (searchResults.length === 0) {
                    return -1;
                  }

                  return current <= 0 ? searchResults.length - 1 : current - 1;
                });
              }

              if (event.key === 'Escape') {
                setIsOpen(false);
                setActiveIndex(-1);
              }

              if (event.key === 'Tab') {
                setIsOpen(false);
              }
            }}
            aria-describedby={searchStatusId}
          />

          <p id={searchStatusId} className="app-visually-hidden" role="status" aria-live="polite">
            {searchStatusMessage}
          </p>

          {isOpen ? (
            <div className="app-header-search__panel" id={listboxId} role="listbox">
              {isLoading ? (
                <p className="app-header-search__empty">{LAYOUT_COPY.searchInProgress}</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className="app-header-search__item"
                    data-active={index === activeIndex}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    tabIndex={-1}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleNavigate(item.route);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </button>
                ))
              ) : (
                <p className="app-header-search__empty">{LAYOUT_COPY.searchEmpty}</p>
              )}
            </div>
          ) : null}
        </div>

        <span className="app-header__shortcut" aria-hidden="true">
          Ctrl/Cmd + K
        </span>
      </div>
    </div>
  );
};

Header.displayName = 'Header';
