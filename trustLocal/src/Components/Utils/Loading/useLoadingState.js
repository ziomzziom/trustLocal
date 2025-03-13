import { useState } from 'react';

export function useLoadingState() {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    setLoading,
  };
}
