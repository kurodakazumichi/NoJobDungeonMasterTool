/******************************************************************************
 * Imports
 *****************************************************************************/
import fs from 'fs';
import { remote, MenuItem, BrowserWindow } from 'electron';

import Env from '@/stores/Env';
import EnemyRepository from '@/dao/Enemy/Repository';
import EnemyEntity from './dao/Enemy/Entity';
import ItemCategoryRepository from '@/dao/ItemCategory/Repository';
import ItemCategoryEntity from '@/dao/ItemCategory/Entity';

/******************************************************************************
 * アプリケーションメニューの処理
 *****************************************************************************/
const { Menu, dialog } = remote;

// 設定
const configs = [
  { file:"enemy.json"          , repo:EnemyRepository       , entity:EnemyEntity },
  { file:"item-categories.json", repo:ItemCategoryRepository, entity:ItemCategoryEntity }
];

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
    configs.map((config) => {
      const json = fs.readFileSync(`${Env.path}\\${config.file}`, 'utf8');
      config.repo.deserialize(json, config.entity);
    });

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

    configs.map((config) => {
      fs.writeFileSync(`${Env.path}\\${config.file}`, config.repo.serialize());
    });

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
