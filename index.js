// Express.jsフレームワークを読み込みます
// Express.jsは、Node.jsでWebアプリケーションを簡単に作成できるフレームワークです
const express = require('express');

// pathモジュールからresolve関数を読み込みます
// resolve関数は、ファイルパスを絶対パスに変換するために使用します
const { resolve } = require('path');

// Expressアプリケーションのインスタンスを作成します
// これがWebサーバーの基礎となるオブジェクトです
const app = express();

// サーバーが使用するポート番号を定義します
// localhost:3010 でアクセスできるようになります
const port = 3010;

// 静的ファイル（CSS、JavaScript、画像など）を配信する設定
// 'static'フォルダ内のファイルを自動的に配信します
// 例: /style.css へのリクエストは static/style.css を返します
app.use(express.static('static'));

// ルートパス（/）へのGETリクエストを処理する設定
// ユーザーがhttp://localhost:3010/にアクセスしたときの動作を定義
app.get('/', (req, res) => {
  // index.htmlファイルを送信します
  // __dirnameは現在のファイル（index.js）があるディレクトリのパス
  // resolveで絶対パスを作成し、pages/index.htmlを指定
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// サーバーを起動し、指定したポートでリクエストを待ち受けます
app.listen(port, () => {
  // サーバーが正常に起動したら、コンソールにメッセージを表示
  console.log(`Example app listening at http://localhost:${port}`);
});
