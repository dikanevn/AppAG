/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Типы для Telegram Web App
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
        };
      };
    };
  }
}

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Проверяем, запущено ли в Telegram
    if (window.Telegram?.WebApp) {
      setIsTelegram(true);
      const tg = window.Telegram.WebApp;
      
      // Инициализируем Telegram Web App
      tg.ready();
      tg.expand();
      
      // Получаем данные пользователя
      if (tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user);
      }

      // Настраиваем главную кнопку
      tg.MainButton.text = "Сбросить счётчик";
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        setCount(0);
        tg.HapticFeedback?.impactOccurred('medium');
      });
    }
  }, []);

  const increment = () => {
    setCount(prev => prev + 1);
    if (isTelegram && window.Telegram?.WebApp) {
      // Тактильная обратная связь в Telegram
      window.Telegram.WebApp.HapticFeedback?.impactOccurred('light');
    }
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - 1));
    if (isTelegram && window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback?.impactOccurred('light');
    }
  };

  const reset = () => {
    setCount(0);
    if (isTelegram && window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback?.impactOccurred('heavy');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isTelegram ? '🤖 Telegram Counter' : '🔢 Web Counter'}
      </Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            Привет, {user.first_name}! 👋
          </Text>
        </View>
      )}
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.decrementButton]} 
          onPress={decrement}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={reset}
        >
          <Text style={styles.buttonText}>🔄</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.incrementButton]} 
          onPress={increment}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.status}>
        Платформа: {isTelegram ? 'Telegram Mini App' : 'Веб-браузер'}
      </Text>
      
      {isTelegram && (
        <Text style={styles.hint}>
          💡 Используйте кнопку внизу для сброса
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  userText: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: '600',
  },
  counterContainer: {
    backgroundColor: '#ffffff',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  counterText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  decrementButton: {
    backgroundColor: '#e74c3c',
  },
  incrementButton: {
    backgroundColor: '#27ae60',
  },
  resetButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  hint: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
