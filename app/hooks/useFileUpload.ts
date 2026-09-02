'use client';

import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface UploadOptions {
  bucket: string;
  path?: string;
  onProgress?: (progress: number) => void;
}

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File, options: UploadOptions) => {
    setLoading(true);
    setError(null);

    try {
      const filePath = `${options.path || 'uploads'}/${Date.now()}-${file.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from(options.bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from(options.bucket)
        .getPublicUrl(filePath);

      return {
        path: filePath,
        url: publicData.publicUrl,
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload gagal';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFile = useCallback(async (bucket: string, path: string) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Hapus file gagal';
      setError(errorMsg);
      throw err;
    }
  }, []);

  return { upload, deleteFile, loading, error };
}
