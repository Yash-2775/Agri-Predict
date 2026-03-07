import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles';
import { NotificationState } from '../types';

interface NotificationProps {
  notifications: NotificationState[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  return (
    <View style={styles.container}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </View>
  );
};

const NotificationItem: React.FC<{ notification: NotificationState }> = ({ notification }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(100);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.notification,
        {
          backgroundColor: notification.type === 'success' ? colors.primary : colors.danger,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <Text style={styles.icon}>{notification.type === 'success' ? '✓' : '✕'}</Text>
      <Text style={styles.message}>{notification.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 250,
  },
  icon: {
    fontSize: 20,
    color: colors.white,
    marginRight: 10,
  },
  message: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
  },
});

export default Notification;