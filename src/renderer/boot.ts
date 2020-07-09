/******************************************************************************
 * Imports
 *****************************************************************************/
import fs from 'fs';
import { remote, MenuItem, BrowserWindow } from 'electron';

import Env from '@/stores/Env';

/******************************************************************************
 * アプリケーションメニューの処理
 *****************************************************************************/
const { Menu, dialog } = remote;

const open = async (item:MenuItem, win:BrowserWindow) => 
{
  // ダイアログが開いている間はWindowを操作できなくする
  win.setEnabled(false);
  Env.lock();

  // ディレクトリ選択ダイアログを開く
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });

  // キャンセル
  if (result.canceled) {
    Env.unlock();
    win.setEnabled(true);
    return;
  }

  // パスを保存
  Env.path = result.filePaths[0];
  win.setTitle(Env.path);

  Env.unlock();
  win.setEnabled(true);
}
  
const save = async (item:MenuItem, win:BrowserWindow) => {

  win.setEnabled(false);
  Env.lock();

  // パスがなければ保存先のパスを選択させる
  while (!fs.existsSync(Env.path)) 
  {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory']});
    

    if (result.canceled) {
      Env.unlock();
      win.setEnabled(true);
      return;
    }

    Env.path = result.filePaths[0];
  }

  Env.unlock();
  win.setEnabled(true);
}

const create = () => {
  const menu:Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        { 
          label: 'Open',
          accelerator: "CmdOrCtrl+O",
          click: open
        },
        {
          label: 'Save',
          accelerator: "CmdOrCtrl+S",
          click: save
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu as any));
}

const bootstrap = () => {
  create();
}

export default bootstrap;
