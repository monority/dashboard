import { useState } from 'react';

import { Button, Card, Input, Select } from '@/components/ui';
import { useToast } from '@/hooks';

import type { SupportTicketFormValues } from '../types';

const REQUEST_TYPE_OPTIONS = [
  { value: 'technical', label: 'Probleme technique' },
  { value: 'billing', label: 'Question de facturation' },
  { value: 'feature', label: 'Demande de fonctionnalite' },
  { value: 'other', label: 'Autre' },
] as const;

const REQUEST_TYPE_LABELS = {
  technical: 'Probleme technique',
  billing: 'Question de facturation',
  feature: 'Demande de fonctionnalite',
  other: 'Autre',
} as const;

export const SupportTicketForm = () => {
  const { notify } = useToast();
  const [values, setValues] = useState<SupportTicketFormValues>({
    type: 'technical',
    subject: '',
    dueDate: '',
  });

  return (
    <Card>
      <form
        className="support-ticket-form"
        onSubmit={(event) => {
          event.preventDefault();

          notify({
            title: 'Ticket cree',
            description: `Type : ${REQUEST_TYPE_LABELS[values.type]} - ${values.subject}`,
            variant: 'success',
          });

          setValues({ type: 'technical', subject: '', dueDate: '' });
        }}
      >
        <h2>Creer un ticket</h2>
        <Select
          label="Type de demande"
          value={values.type}
          onChange={(nextType) => setValues((prev) => ({ ...prev, type: nextType }))}
          options={REQUEST_TYPE_OPTIONS.map((option) => ({ ...option }))}
        />
        <Input
          label="Sujet"
          type="text"
          placeholder="Decris ton besoin"
          value={values.subject}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setValues((prev) => ({ ...prev, subject: value }));
          }}
          required
        />
        <Input
          label="Date souhaitee"
          type="date"
          value={values.dueDate}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setValues((prev) => ({ ...prev, dueDate: value }));
          }}
          required
        />
        <Button type="submit">Envoyer le ticket</Button>
      </form>
    </Card>
  );
};
