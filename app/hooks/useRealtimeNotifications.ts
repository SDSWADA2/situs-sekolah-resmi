'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Notification as NotificationType } from '@/types';

export function useRealtimeNotifications(userId: string) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to notifications
    const subscription = supabase
      .from(`notifications:user_id=eq.${userId}`)
      .on('INSERT', (payload) => {
        setNotifications(prev => [payload.new as NotificationType, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .on('UPDATE', (payload) => {
        const updated = payload.new as NotificationType;
        setNotifications(prev =>
          prev.map(n => (n.id === updated.id ? updated : n))
        );
        if (!updated.read) {
          setUnreadCount(prev => prev + 1);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
  };

  const markAllAsRead = async () => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId);
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}
