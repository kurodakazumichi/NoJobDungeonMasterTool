---
marp: true
---
<!-- theme: gaia -->
<!-- size: 16:9 -->

# electron-webpack-quick-start

---

# electron-webpackとは？

- 最近のウェブ開発はwebpackとかbabelとかeslintとか、その他もろもろ沢山のセットアップがあって大変。

- 残念なことにElectron開発をする場合のセットアップもとても大変でした。

- electron-webpackは、こういっためんどくさくて大変なセットアップを不要にしてさっさとアプリケーション開発が始められるようにするものです。

---

# quick-startの導入と動作確認

```
git clone https://github.com/electron-userland/electron-webpack-quick-start.git
cd electron-webpack-quick-start
rm -rf .git

yarn
```

いろいろインストールされる

```
yarn dev
```

動いた

---

# electron-webpackの素晴らさ

- 詳細なドキュメント
- ソースコードのバンドルにwebpackを使用する
- 開発にwebpack-dev-serverを使用する
- レンダラーとメインプロセスの両方でHMR**←最高**
- electronのversionに基づいて自動的に設定される @babel/preset-env の使用
- webpackのローダーやプラグインなどを追加する機能
- TypeScript、Less、EJSなどの項目をサポートするアドオン

---

# 基本の構造
```
my-project/
├─ src/
│  ├─ main/
│  │  └─ index.js
│  ├─ renderer/
│  │  └─ index.js
│  └─ common/
└─ static/
```

---

- src/main
  メインプロセスに関するコード
- src/renderer (OPTIONAL)
  Reactとか何かしらのウェブアプリケーション
- src/common (OPTIONAL)
  mainとrendererで共通なユーティリティ
- static (OPTIONAL)
  webpackでバンドルされたくないようなもの

---

electron-webpackが望む事

- mainとrendererでディレクトリが別れている事
- それぞれにエントリーポイントとなるファイルがある事
  - index.js or main.js
  - index.ts or main.ts (TypeScriptの場合)

---

electron-webpackをtypescriptにすると`yarn dev`した時に下記のエラーがでる

ERROR in D:/Works/nodejs/Electrons/electron-webpack-quick-start/node_modules/electronelectron.d.ts(7545,22):
TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?

@types/nodeの12->13の際にEventEmitterがclassからinterfaceに変更されたことが原因らしい
ということで12系の @types/node をインストールする

`yarn add -D @types/node@12.6.9`

--- 

# nodeIntegrationの設定
https://gist.github.com/earksiinni/053470a04defc6d7dfaacd5e5a073b15

electron-webpackの現在のバージョン(2019-02-02現在)では、BrowserWindowのインスタンスがnodeIntegration: trueになっていることを前提に設定されています。

しかし、Electronではセキュリティ上の注意としてnodeIntegration: falseを設定することを推奨しており、将来的にはBrowserWindowでもデフォルトでfalseに設定されるようになります。

---

現在、Electron-webpackでこれを行うと、index.htmlテンプレートにcommonjsのrequireがハードワイヤードされているため、エラーがスローされます（nodeIntegration: trueでのみ動作します）。

さらに、レンダラースクリプトはwebpackによってcommonjsをライブラリターゲットとして使用して構築されており、nodeIntegration: trueを使用していないブラウザでもエラーが発生します。

---

# preload.tsを動作させるには

package.jsonに "extraEntries": ["@/preload.ts"] を追加

```
  "electronWebpack": {
    "main": {
      "extraEntries": ["@/preload.ts"]
    }
  }
```

---

## src/main/preload.ts

```
const electron = require('electron');

process.once('loaded', () => {
  console.log('---- preload.js loaded ts ----');
  // globalに入れるとwindowオブジェクトのプロパティに設定される
  (global as any).electron = electron;
  (global as any).module   = module;
});
```

globalオブジェクトのプロパティを設定するとレンダラープロセスのwindowオブジェクトのプロパティとして使えるようになる。

---

## src/main/index.ts

```
  const preloadPath = (isDevelopment)
    ? "../../dist/main/preload.js"
    : "preload.js";

  const window = new BrowserWindow({
    webPreferences: {
      // レンダラープロセスで Node.js 使えないようにする (XSS対策)
      // electron-webpackではtrue前提なのでtrue
      nodeIntegration: true,
      // preloadスクリプトを, レンダラープロセスとは別のJavaScriptコンテキストで実行するかどうか
      // false にしないと、window object を共有できないのでfalse
      contextIsolation: false,
      // preload.jsのpathを指定、絶対パスじゃないと動かなかった
      preload: path.resolve(__dirname, preloadPath)
    }
  })
```
---

# typescriptで__staticを使う

- __static は staticディレクトリのパスを提供する環境変数
- tsの場合、`declare const __static: string;`を定義する必要あり

```
import fs from 'fs'
import path from 'path'

/* use `path` to create the full path to our asset */
const pathToAsset = path.join(__static, '/foobar.txt')

/* use `fs` to consume the path and read our asset */
const fileContents = fs.readFileSync(pathToAsset, 'utf8')

console.log(fileContents)
```
