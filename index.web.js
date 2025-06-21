import { AppRegistry } from 'react-native';
import App from './App';

// Регистрируем компонент
AppRegistry.registerComponent('AppAG', () => App);

// Запускаем приложение для web
AppRegistry.runApplication('AppAG', {
  initialProps: {},
  rootTag: document.getElementById('root') || document.getElementById('main') || document.body,
});
