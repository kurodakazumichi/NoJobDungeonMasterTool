/******************************************************************************
 * Imports
 *****************************************************************************/
import fs from 'fs';
import { remote, MenuItem, BrowserWindow } from 'electron';

import Env from '@/stores/Env';
import EnemyRepository from '@/dao/Enemy/Repository';
import EnemyEntity from './dao/Enemy/Entity';

/******************************************************************************
 * アプリケーションメニューの処理
 *****************************************************************************/
const { Menu, dialog } = remote;

/**
 * ディレクトリを選択してデータを読み込む
 */
const open = async (item:MenuItem, win:BrowserWindow) => 
{
  // ダイアログが開いている間はWindowを操作できなくする
  win.setEnabled(false);
  Env.lock();

  try {

    // ディレクトリ選択ダイアログを開く
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });

    // ディレクトリ選択がキャンセルされた
    if (result.canceled) 
    {
      Env.unlock();
      win.setEnabled(true);
      return;
    }

    // パスを保存
    Env.path = result.filePaths[0];

    // Windowタイトルにパスを設定
    win.setTitle(Env.path);

    // ファイル読み込み
    const json = fs.readFileSync(Env.path + "\\enemy.json", 'utf8');
    EnemyRepository.deserialize(json, EnemyEntity);

  } catch(err) {
    console.log(err);
    alert("ファイルの読み込みに失敗しました。");
  } finally {
    Env.unlock();
    win.setEnabled(true);    
  }
}
  
/**
 * ディレクトリを選択してデータを書き込む
 */
const save = async (item:MenuItem, win:BrowserWindow) => {

  win.setEnabled(false);
  Env.lock();

  try {

    // パスがなければ保存先のパスを選択させる
    if (!fs.existsSync(Env.path)) 
    {
      const result = await dialog.showOpenDialog({ properties: ['openDirectory']});
      

      if (result.canceled) {
        Env.unlock();
        win.setEnabled(true);
        return;
      }
      Env.path = result.filePaths[0];
    }

    fs.writeFileSync(Env.path + "\\enemy.json", EnemyRepository.serialize());

  } catch(err) {
    console.log(err);
    alert("ファイルの保存に失敗しました。");    
  } finally {
    Env.unlock();
    win.setEnabled(true);
  }
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
