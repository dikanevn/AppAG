/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TonConnectButton, useTonWallet, useTonAddress } from '@tonconnect/ui-react';

export default function App() {
  const [count, setCount] = useState(0);
  const wallet = useTonWallet();
  const address = useTonAddress();

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - 1));
  };

  const reset = () => {
    setCount(0);
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  // Отладочная информация
  console.log('Wallet:', wallet);
  console.log('Address:', address);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🔢 TON Счётчик версия 3
      </Text>

      {/* TON Wallet Section */}
      <View style={styles.walletSection}>
        <View style={styles.tonConnectContainer}>
          <TonConnectButton />
        </View>
        
        {/* Показываем статус подключения */}
        {wallet && (
          <View style={styles.walletInfo}>
            <Text style={styles.connectedText}>
              ✅ Кошелёк подключен!
            </Text>
            <Text style={styles.walletName}>
              {wallet.device?.appName || 'TON Wallet'}
            </Text>
          </View>
        )}

        {/* Показываем адрес если есть */}
        {address && (
          <View style={styles.addressInfo}>
            <Text style={styles.walletText}>
              💎 {formatAddress(address)}
            </Text>
            <Text style={styles.fullAddress}>
              {address}
            </Text>
          </View>
        )}

        {/* Отладочная информация */}
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            Wallet: {wallet ? 'Connected' : 'Not connected'}
          </Text>
          <Text style={styles.debugText}>
            Address: {address ? 'Available' : 'Not available'}
          </Text>
        </View>
      </View>
      
      {/* Counter Section */}
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
    marginBottom: 30,
    textAlign: 'center',
  },
  walletSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tonConnectContainer: {
    marginBottom: 15,
  },
  walletInfo: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 200,
    marginBottom: 10,
  },
  addressInfo: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 200,
    marginBottom: 10,
  },
  walletText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5a2d',
    marginBottom: 4,
  },
  walletName: {
    fontSize: 14,
    color: '#5a7c5a',
  },
  fullAddress: {
    fontSize: 10,
    color: '#5a7c5a',
    marginTop: 4,
    textAlign: 'center',
  },
  debugInfo: {
    backgroundColor: '#fff3cd',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  debugText: {
    fontSize: 12,
    color: '#856404',
  },
  connectedText: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
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
    marginBottom: 20,
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
});
