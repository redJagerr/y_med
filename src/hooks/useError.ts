import { useEffect } from 'react';

import { FormStatus } from '@/types';

interface UseSuccessParams {
  status: FormStatus;
  onError: () => void;
}

export const useError = ({ status, onError }: UseSuccessParams) =>
  useEffect(() => {
    if (status !== 'error') return;
    const errorTimer = setTimeout(() => {
      onError();
    }, 3000);
    return () => clearTimeout(errorTimer);
  }, [status]);
