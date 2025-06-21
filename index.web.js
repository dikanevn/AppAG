import { AppRegistry } from 'react-native';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import React from 'react';

// Обёртка приложения с TON Connect провайдером
function AppWithTonConnect() {
  return (
    <TonConnectUIProvider manifestUrl="https://dikanevn.github.io/AppAG/tonconnect-manifest.json">
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
