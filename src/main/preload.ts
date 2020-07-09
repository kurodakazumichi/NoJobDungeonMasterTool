import Core from './core';
import global from './types/global';

process.once('loaded', () => {

  console.log('---- preload.js loaded ts ----');
  // globalに入れるとwindowオブジェクトのプロパティに設定される
  global.core = Core;

});