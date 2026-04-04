import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Input } from '@/components/ui';
import { debounce } from '@/utils/debounce';

import { MAIL_COPY } from '../display';
import { useMailThreads } from '../hooks';
import type { MailFolder, MailThread } from '../types';
import { buildMailSearchParams, DEFAULT_MAIL_FOLDER, parseMailUrlFilters } from '../url-filters';

import { MailFolders } from './MailFolders';
import { MailPreview } from './MailPreview';
import { MailThreadList } from './MailThreadList';
import './mail-page.css';

export const MailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFolder, setActiveFolder] = useState<MailFolder>(DEFAULT_MAIL_FOLDER);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedThread, setSelectedThread] = useState<MailThread | null>(null);

  useEffect(() => {
    const { folder: nextFolder, search: nextSearch } = parseMailUrlFilters(searchParams);

    setActiveFolder((previous) => (previous === nextFolder ? previous : nextFolder));
    setSearch((previous) => (previous === nextSearch ? previous : nextSearch));
    setDebouncedSearch((previous) => (previous === nextSearch ? previous : nextSearch));
  }, [searchParams]);

  useEffect(() => {
    const nextParams = buildMailSearchParams({
      folder: activeFolder,
      search,
    });

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeFolder, search, searchParams, setSearchParams]);

  const updateDebouncedSearch = useMemo(
    () =>
      debounce<[string]>((nextValue) => {
        setDebouncedSearch(nextValue);
      }, 250),
    [],
  );

  const { data: threads = [], isLoading } = useMailThreads({
    folder: activeFolder,
    search: debouncedSearch,
  });

  const canResetFilters = activeFolder !== DEFAULT_MAIL_FOLDER || search.trim() !== '';

  useEffect(() => {
    const nextSelected =
      threads.find((thread) => thread.id === selectedThread?.id) ?? threads[0] ?? null;
    setSelectedThread(nextSelected);
  }, [selectedThread?.id, threads]);

  return (
    <section className="mail-page">
      <header className="mail-page-toolbar">
        <h1>{MAIL_COPY.pageTitle}</h1>
        <Input
          type="search"
          label={MAIL_COPY.searchLabel}
          placeholder={MAIL_COPY.searchPlaceholder}
          value={search}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setSearch(nextValue);
            updateDebouncedSearch(nextValue);
          }}
        />
        <MailFolders activeFolder={activeFolder} onChange={setActiveFolder} />
        <div className="mail-toolbar-actions">
          <Button
            variant="ghost"
            disabled={!canResetFilters}
            onClick={() => {
              setActiveFolder(DEFAULT_MAIL_FOLDER);
              setSearch('');
              setDebouncedSearch('');
            }}
          >
            {MAIL_COPY.clearFilters}
          </Button>
        </div>
      </header>

      <div className="mail-page-grid">
        <MailThreadList
          threads={threads}
          selectedThreadId={selectedThread?.id ?? null}
          isLoading={isLoading}
          onSelect={setSelectedThread}
        />
        <MailPreview thread={selectedThread} />
      </div>
    </section>
  );
};
