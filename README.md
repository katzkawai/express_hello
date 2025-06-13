# 時間帯別挨拶アプリ

時間帯に応じて異なる挨拶を表示するシンプルなWebアプリケーションです。

## 概要

このアプリケーションは、現在の時刻を表示し、時間帯に応じて適切な日本語の挨拶を表示します。

### 時間帯別の挨拶
- **朝 (5:00-10:59)**: おはようございます 🌅
- **昼 (11:00-17:59)**: こんにちは ☀️
- **夜 (18:00-23:59)**: こんばんは 🌙
- **深夜 (0:00-4:59)**: こんばんは 🌃

## 技術スタック

- **バックエンド**: Express.js (Node.js)
- **フロントエンド**: HTML, CSS, JavaScript (バニラ)
- **スタイリング**: CSSアニメーション、レスポンシブデザイン

## セットアップと利用方法

### 必要な環境
- Node.js (v12以上推奨)
- npm

### インストール手順

1. リポジトリをクローン
```bash
git clone [repository-url]
cd express_hello
```

2. 依存関係をインストール
```bash
npm install
```

3. アプリケーションを起動
```bash
npm start
```

4. ブラウザで以下のURLにアクセス
```
http://localhost:3010
```

## ファイル構成

```
express_hello/
├── index.js          # Express サーバー
├── pages/
│   └── index.html    # メインページ
├── static/
│   ├── script.js     # クライアントサイドのロジック
│   └── style.css     # スタイルシート
└── package.json      # プロジェクト設定
```

## 機能

- リアルタイムの時刻表示（1分ごとに自動更新）
- 時間帯に応じた挨拶の自動切り替え
- アニメーション効果付きの洗練されたUI
- レスポンシブデザイン対応

## 開発者向け情報

このプロジェクトはExpress.jsを使用したシンプルな構成になっており、追加のビルドツールは不要です。静的ファイルは`static`ディレクトリから直接配信されます。

Express.jsの詳細については[公式ドキュメント](https://expressjs.com/)をご覧ください。

## 改造のヒント

このアプリケーションをカスタマイズして、オリジナルの機能を追加してみましょう！

### 🎨 デザインのカスタマイズ

#### 1. 配色を変更する
`static/style.css`の時間帯別背景色を変更：
```css
/* 例：朝を青系のグラデーションに変更 */
body.morning {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### 2. フォントを変更する
Google Fontsなどを使用して、好きなフォントに変更：
```html
<!-- index.htmlのheadタグ内に追加 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
```

### 🌍 多言語対応

#### 英語の挨拶を追加する例
`static/script.js`の時間帯設定を変更：
```javascript
this.timeRanges = {
  morning: { 
    start: 5, 
    end: 10, 
    message: 'Good Morning / おはようございます', 
    icon: '🌅' 
  },
  // 他の時間帯も同様に...
};
```

### ⚡ 新機能の追加

#### 1. 現在の日付を表示
`pages/index.html`に日付表示エリアを追加：
```html
<div class="date-display" id="dateDisplay">
  <span class="date-text" id="dateText">--月--日</span>
</div>
```

`static/script.js`に日付更新関数を追加：
```javascript
updateDateDisplay() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateString = `${month}月${day}日`;
  
  if (this.dateElement) {
    this.dateElement.textContent = dateString;
  }
}
```

#### 2. 天気情報の表示
OpenWeatherMap APIなどを使用して天気情報を追加：
```javascript
async fetchWeather() {
  const apiKey = 'YOUR_API_KEY';
  const city = 'Tokyo';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    // 天気情報を表示する処理
  } catch (error) {
    console.error('天気情報の取得に失敗しました:', error);
  }
}
```

#### 3. ユーザー名の入力と保存
localStorage を使用してユーザー名を保存：
```javascript
// ユーザー名を保存
saveUserName(name) {
  localStorage.setItem('userName', name);
}

// ユーザー名を取得
getUserName() {
  return localStorage.getItem('userName') || 'ゲスト';
}

// 挨拶にユーザー名を含める
getPersonalizedGreeting(timeBasedGreeting) {
  const userName = this.getUserName();
  return `${userName}さん、${timeBasedGreeting}`;
}
```

### 🎯 パフォーマンスの改善

#### 1. 画像の遅延読み込み
背景画像を使用する場合：
```javascript
const img = new Image();
img.onload = function() {
  document.body.style.backgroundImage = `url(${img.src})`;
};
img.src = 'path/to/background.jpg';
```

#### 2. Service Workerでオフライン対応
PWA（Progressive Web App）化：
```javascript
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/style.css',
        '/script.js'
      ]);
    })
  );
});
```

### 🔧 サーバーサイドの拡張

#### 1. APIエンドポイントの追加
`index.js`に新しいルートを追加：
```javascript
// 現在時刻をJSON形式で返すAPI
app.get('/api/time', (req, res) => {
  const now = new Date();
  res.json({
    time: now.toLocaleTimeString('ja-JP'),
    date: now.toLocaleDateString('ja-JP')
  });
});
```

#### 2. データベース接続
SQLiteなどの軽量データベースを使用：
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('greetings.db');

// 訪問者数をカウント
app.get('/api/visitors', (req, res) => {
  db.run('UPDATE visitors SET count = count + 1');
  db.get('SELECT count FROM visitors', (err, row) => {
    res.json({ count: row.count });
  });
});
```

### 📱 モバイル対応の強化

#### タッチジェスチャーの追加
```javascript
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > 50) {
    // スワイプで背景色を変更
    changeTheme();
  }
});
```

### 🎮 インタラクティブ要素

#### クリックで絵文字を変更
```javascript
this.iconElement.addEventListener('click', () => {
  const emojis = ['😊', '🎉', '✨', '🌟', '💫'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  this.iconElement.textContent = randomEmoji;
  
  // アニメーション効果
  this.iconElement.style.transform = 'rotate(360deg) scale(1.5)';
  setTimeout(() => {
    this.iconElement.style.transform = 'rotate(0deg) scale(1)';
  }, 500);
});
```

これらのヒントを参考に、自分だけのオリジナルアプリケーションを作成してみてください！
