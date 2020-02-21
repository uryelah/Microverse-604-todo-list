import ui from './ui';
import Store from './localStorage';

Store.parseFromStorage();

window.onload = () => {
  ui();
};
