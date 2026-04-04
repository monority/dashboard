import { useEffect, useState } from 'react';

import { Badge, Button, Card, Select, Skeleton } from '@/components/ui';
import { useToast } from '@/hooks';
import { uiStore } from '@/stores';
import { UI_THEME } from '@/utils';

import { SETTINGS_COPY } from '../display';
import { useSettings } from '../hooks';
import type { SettingsFormValues } from '../types';
import './settings-page.css';

export const SettingsPage = () => {
  const { notify } = useToast();
  const setTheme = uiStore((state) => state.setTheme);
  const { data, isLoading, saveSettings, refetch } = useSettings();

  const [values, setValues] = useState<SettingsFormValues>({
    theme: 'system',
    notificationsEnabled: true,
  });

  useEffect(() => {
    if (data) {
      setValues(data);
      setTheme(data.theme);
    }
  }, [data, setTheme]);

  return (
    <section className="settings-page">
      <header>
        <h1>{SETTINGS_COPY.pageTitle}</h1>
        <p>{SETTINGS_COPY.pageDescription}</p>
      </header>

      <Card>
        {isLoading ? (
          <div className="settings-skeleton" aria-hidden="true">
            <Skeleton height="1.4rem" />
            <Skeleton height="1.4rem" />
            <Skeleton height="1.4rem" />
          </div>
        ) : (
          <form
            className="settings-form"
            onSubmit={(event) => {
              event.preventDefault();

              saveSettings.mutate(values, {
                onSuccess: (saved) => {
                  setTheme(saved.theme);
                  notify({
                    title: SETTINGS_COPY.savedTitle,
                    description: SETTINGS_COPY.savedDescription,
                    variant: 'success',
                  });
                  void refetch();
                },
              });
            }}
          >
            <fieldset className="settings-fieldset">
              <legend>{SETTINGS_COPY.appearance}</legend>
              <Select
                label={SETTINGS_COPY.theme}
                value={values.theme}
                onChange={(theme) => setValues((prev) => ({ ...prev, theme }))}
                options={[
                  { value: UI_THEME.light, label: SETTINGS_COPY.themeOptions.light },
                  { value: UI_THEME.dark, label: SETTINGS_COPY.themeOptions.dark },
                  { value: UI_THEME.system, label: SETTINGS_COPY.themeOptions.system },
                ]}
              />
            </fieldset>

            <fieldset className="settings-fieldset">
              <legend>{SETTINGS_COPY.notifications}</legend>
              <div className="settings-row">
                <p>{SETTINGS_COPY.enableNotifications}</p>
                <Button
                  type="button"
                  variant={values.notificationsEnabled ? 'primary' : 'ghost'}
                  onClick={() =>
                    setValues((prev) => ({
                      ...prev,
                      notificationsEnabled: !prev.notificationsEnabled,
                    }))
                  }
                >
                  {values.notificationsEnabled ? SETTINGS_COPY.enabled : SETTINGS_COPY.disabled}
                </Button>
              </div>
              <Badge
                label={
                  values.notificationsEnabled
                    ? SETTINGS_COPY.activeStatus
                    : SETTINGS_COPY.mutedStatus
                }
                variant={values.notificationsEnabled ? 'success' : 'warning'}
              />
            </fieldset>

            <Button type="submit" disabled={saveSettings.isPending}>
              {saveSettings.isPending ? SETTINGS_COPY.saving : SETTINGS_COPY.save}
            </Button>
          </form>
        )}
      </Card>
    </section>
  );
};
