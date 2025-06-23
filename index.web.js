import { AppRegistry } from 'react-native';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import React from 'react';
import { TonConnect } from '@tonconnect/sdk';

// Создаем коннектор с манифестом и новым шлюзом
const connector = new TonConnect({
  manifestUrl: 'https://dikanevn.github.io/AppAG/tonconnect-manifest.json',
  walletsListSource: 'https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json',
  // Пробуем другой шлюз для подключения
  gateway: {
      bridgeUrl: 'https://bridge.ton-connect.pro/bridge'
  }
});

// Добавляем логирование для отслеживания статуса подключения
connector.onStatusChange(wallet => {
  console.log('--- TON CONNECT STATUS CHANGED ---');
  if (wallet) {
    console.log('Wallet connected:', {
      address: wallet.account.address,
      chain: wallet.account.chain,
      walletInfo: wallet.device,
    });
  } else {
    console.log('Wallet disconnected.');
  }
  console.log('---------------------------------');
});

// Обёртка приложения с TON Connect провайдером
function AppWithTonConnect() {
  return (
    <TonConnectUIProvider connector={connector}>
      <App />
    </TonConnectUIProvider>
  );
}

// Регистрируем компонент
AppRegistry.registerComponent('AppAG', () => AppWithTonConnect);

// Запускаем приложение для web
AppRegistry.runApplication('AppAG', {
  initialProps: {},
  rootTag: document.getElementById('root') || document.getElementById('main') || document.body,
});
