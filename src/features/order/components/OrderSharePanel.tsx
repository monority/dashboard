import { useState } from 'react';

import { Button, Card, Input } from '@/components/ui';
import { useToast } from '@/hooks';

import { ORDER_COPY } from '../display';

interface OrderSharePanelProps {
  initialUrl: string;
  isLoading: boolean;
}

export const OrderSharePanel = ({ initialUrl, isLoading }: OrderSharePanelProps) => {
  const { notify } = useToast();
  const [documentUrl, setDocumentUrl] = useState(initialUrl);

  return (
    <Card>
      <div className="order-share-panel">
        <h2>{ORDER_COPY.shareTitle}</h2>
        <p>{ORDER_COPY.shareDescription}</p>
        <Input
          label={ORDER_COPY.documentUrlLabel}
          type="text"
          value={documentUrl}
          onChange={(event) => setDocumentUrl(event.currentTarget.value)}
          disabled={isLoading}
        />
        <Button
          onClick={() => {
            notify({
              title: ORDER_COPY.linkCopiedTitle,
              description: documentUrl,
              variant: 'success',
            });
          }}
          disabled={isLoading || documentUrl.trim().length === 0}
        >
          {ORDER_COPY.copyLink}
        </Button>
      </div>
    </Card>
  );
};
