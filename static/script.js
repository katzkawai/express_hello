/**
 * 時間帯別挨拶アプリケーション
 * 現在時刻に基づいて適切な挨拶メッセージを表示
 */

// クラスを使用してアプリケーションの機能をまとめて管理
class GreetingApp {
  constructor() {
    // DOM要素の取得
    // document.getElementByIdで、HTMLのid属性から要素を取得
    this.timeElement = document.getElementById('timeText');        // 時刻表示要素
    this.greetingElement = document.getElementById('greetingText'); // 挨拶表示要素
    this.iconElement = document.getElementById('iconEmoji');        // アイコン表示要素
    this.bodyElement = document.body;                               // body要素（テーマ変更用）
    
    // 時間帯設定
    // 各時間帯の開始時刻、終了時刻、挨拶メッセージ、アイコンを定義
    this.timeRanges = {
      morning: { start: 5, end: 10, message: 'おはようございます', icon: '🌅' },     // 朝5時〜10時
      afternoon: { start: 11, end: 17, message: 'こんにちは', icon: '☀️' },         // 昼11時〜17時
      evening: { start: 18, end: 23, message: 'こんばんは', icon: '🌙' },          // 夜18時〜23時
      lateNight: { start: 0, end: 4, message: 'こんばんは', icon: '🌃' }           // 深夜0時〜4時
    };
    
    // 初期化
    this.init();
  }
  
  /**
   * アプリケーションの初期化
   */
  init() {
    // 初回実行：すぐに時刻と挨拶を表示
    this.updateTimeAndGreeting();
    
    // 1分ごとに更新（正確に分が変わるタイミングで実行）
    // 次の分の00秒になったら更新するようスケジュール設定
    this.scheduleNextUpdate();
    
    // コンソールに起動メッセージを表示（開発者ツールで確認可能）
    console.log('時間帯別挨拶アプリが起動しました');
  }
  
  /**
   * 現在時刻を取得してフォーマット
   * @returns {Object} 時刻情報オブジェクト
   */
  getCurrentTime() {
    const now = new Date();         // 現在の日時を取得
    const hours = now.getHours();   // 時（0〜23）
    const minutes = now.getMinutes(); // 分（0〜59）
    
    // HH:MM形式でフォーマット
    // padStart(2, '0')で1桁の場合は0を付けて2桁にする
    // 例: 9時5分 → "09:05"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    // オブジェクトとして時刻情報を返す
    return {
      hours,          // 時
      minutes,        // 分
      formattedTime,  // フォーマット済み時刻文字列
      timestamp: now  // 元のDateオブジェクト
    };
  }
  
  /**
   * 時間帯を判定して適切なメッセージを取得
   * @param {number} hours - 現在の時刻（24時間形式）
   * @returns {Object} 時間帯情報オブジェクト
   */
  getTimeBasedGreeting(hours) {
    // 時間帯の判定：条件分岐で現在の時刻がどの時間帯に該当するか確認
    if (hours >= this.timeRanges.morning.start && hours <= this.timeRanges.morning.end) {
      // 朝（5時〜10時）
      return { ...this.timeRanges.morning, period: 'morning' };
    } else if (hours >= this.timeRanges.afternoon.start && hours <= this.timeRanges.afternoon.end) {
      // 昼（11時〜17時）
      return { ...this.timeRanges.afternoon, period: 'afternoon' };
    } else if (hours >= this.timeRanges.evening.start && hours <= 23) {
      // 夜（18時〜23時）
      return { ...this.timeRanges.evening, period: 'evening' };
    } else {
      // 深夜（0時〜4時59分）
      // 注：深夜も見た目のテーマは夜と同じ（period: 'evening'）
      return { ...this.timeRanges.lateNight, period: 'evening' };
    }
  }
  
  /**
   * UIを更新（時刻、挨拶、テーマ）
   * この関数が呼ばれると、画面の全ての要素が最新の状態に更新される
   */
  updateTimeAndGreeting() {
    // 現在時刻を取得
    const timeInfo = this.getCurrentTime();
    // 時刻に応じた挨拶情報を取得
    const greetingInfo = this.getTimeBasedGreeting(timeInfo.hours);
    
    // 各UIパーツを更新
    this.updateTimeDisplay(timeInfo.formattedTime);    // 時刻表示
    this.updateGreetingMessage(greetingInfo.message);  // 挨拶メッセージ
    this.updateIcon(greetingInfo.icon);                // アイコン
    this.updateTheme(greetingInfo.period);             // 背景テーマ
    
    // コンソールログ（開発者ツールで動作確認用）
    console.log(`更新: ${timeInfo.formattedTime} - ${greetingInfo.message} (${greetingInfo.period})`);
  }
  
  /**
   * 時刻表示を更新
   * @param {string} timeString - フォーマット済み時刻文字列
   */
  updateTimeDisplay(timeString) {
    // 要素が存在する場合のみ更新（エラー防止）
    if (this.timeElement) {
      // フェード効果付きで更新
      this.timeElement.style.opacity = '0.5';         // 半透明にする
      setTimeout(() => {
        this.timeElement.textContent = timeString;   // テキストを更新
        this.timeElement.style.opacity = '1';        // 不透明に戻す
      }, 150);  // 150ミリ秒後に実行
    }
  }
  
  /**
   * 挨拶メッセージを更新
   * @param {string} message - 挨拶メッセージ
   */
  updateGreetingMessage(message) {
    // 要素が存在し、かつメッセージが変更された場合のみ更新
    if (this.greetingElement && this.greetingElement.textContent !== message) {
      // スライドフェード効果
      this.greetingElement.style.opacity = '0';                     // 透明にする
      this.greetingElement.style.transform = 'translateY(10px)';   // 10px下に移動
      
      setTimeout(() => {
        this.greetingElement.textContent = message;               // テキストを更新
        this.greetingElement.style.opacity = '1';                 // 不透明に戻す
        this.greetingElement.style.transform = 'translateY(0)';    // 元の位置に戻す
      }, 300);  // 300ミリ秒後に実行（スムーズなアニメーション）
    }
  }
  
  /**
   * アイコンを更新
   * @param {string} icon - 表示するアイコン（絵文字）
   */
  updateIcon(icon) {
    // 要素が存在し、かつアイコンが変更された場合のみ更新
    if (this.iconElement && this.iconElement.textContent !== icon) {
      // バウンス（弾む）効果付きで更新
      this.iconElement.style.transform = 'scale(0.8)';     // 縮小
      setTimeout(() => {
        this.iconElement.textContent = icon;               // アイコンを変更
        this.iconElement.style.transform = 'scale(1.2)';   // 拡大
        setTimeout(() => {
          this.iconElement.style.transform = 'scale(1)';   // 元のサイズに戻す
        }, 200);  // 200ミリ秒後
      }, 150);    // 150ミリ秒後
    }
  }
  
  /**
   * テーマ（背景）を更新
   * @param {string} period - 時間帯（morning/afternoon/evening）
   */
  updateTheme(period) {
    // 利用可能なテーマの一覧
    const themes = ['morning', 'afternoon', 'evening'];
    
    // 既存のテーマクラスを全て削除
    // これにより、複数のテーマが同時に適用されることを防ぐ
    themes.forEach(theme => {
      this.bodyElement.classList.remove(theme);
    });
    
    // 新しいテーマクラスを追加
    // CSSで定義されたスタイルが適用される
    this.bodyElement.classList.add(period);
  }
  
  /**
   * 次回更新のスケジュール設定
   * 分が変わるタイミングで正確に実行されるように調整
   */
  scheduleNextUpdate() {
    const now = new Date();
    const seconds = now.getSeconds();         // 現在の秒（0〜59）
    const milliseconds = now.getMilliseconds(); // 現在のミリ秒（0〜999）
    
    // 次の分の開始（00秒）までの残り時間を計算
    // 例: 現在45秒300ミリ秒の場合 → (60-45)*1000-300 = 14700ミリ秒後
    const timeToNextMinute = (60 - seconds) * 1000 - milliseconds;
    
    // 最初の更新を次の分の開始時にスケジュール
    setTimeout(() => {
      this.updateTimeAndGreeting();  // 時刻を更新
      
      // その後は1分間隔で定期実行
      setInterval(() => {
        this.updateTimeAndGreeting();
      }, 60000); // 60秒 = 60000ミリ秒 = 1分
      
    }, timeToNextMinute);
  }
}

/**
 * DOMが読み込まれた後にアプリケーションを起動
 * HTMLの全要素が読み込まれてから実行されるため、要素が見つからないエラーを防げる
 */
document.addEventListener('DOMContentLoaded', () => {
  // アプリケーションのインスタンスを作成
  // new演算子でクラスからオブジェクトを生成
  const app = new GreetingApp();
  
  // エラーハンドリング
  // JavaScriptエラーが発生した場合にコンソールに表示
  window.addEventListener('error', (event) => {
    console.error('アプリケーションエラー:', event.error);
  });
  
  // ページの可視性変更時の処理
  // ブラウザのタブを切り替えた後、戻ってきたときの処理
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // ページが再表示されたときに即座に時刻を更新
      // これにより、タブを長時間離れていても正確な時刻が表示される
      app.updateTimeAndGreeting();
    }
  });
});