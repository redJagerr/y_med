import { useEffect } from 'react';

import { FormStatus } from '@/types';

interface UseSuccessParams {
  status: FormStatus;
  onSuccess: () => void;
}

export const useSuccess = ({ status, onSuccess }: UseSuccessParams) =>
  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => {
      onSuccess();
    }, 2000);
    return () => clearTimeout(timer);
  }, [status]);
