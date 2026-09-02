'use client';

import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  onSubmit: (data: T) => Promise<void>;
  onError?: (error: Error) => void;
}

export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>) {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  }, [fieldErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await options.onSubmit(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(errorMsg);
      options.onError?.(err instanceof Error ? err : new Error(errorMsg));
    } finally {
      setLoading(false);
    }
  }, [data, options]);

  const reset = useCallback(() => {
    setData({} as T);
    setError(null);
    setFieldErrors({});
  }, []);

  const setFieldError = useCallback((field: string, message: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  return {
    data,
    setData,
    loading,
    error,
    fieldErrors,
    handleChange,
    handleSubmit,
    reset,
    setFieldError,
  };
}
