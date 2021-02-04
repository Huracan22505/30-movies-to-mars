import { error, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/Angeler.css';
defaults.closerHover = false;
defaults.icons = 'angeler';

const myStack = new Stack({
  dir1: 'up',
  dir2: 'left',
  firstpos1: 500,
  firstpos2: 20,
  spacing1: 40,
  spacing2: 40,
  maxOpen: 1,
});

function showNotification(text) {
  myStack.close(true);
  error({
    type: 'error',
    styling: 'angeler',
    text: text,
    stack: myStack,
    delay: 500,
  });
}

export default showNotification;
