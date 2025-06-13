/**
 * 時間帯別挨拶アプリケーション
 * 現在時刻に基づいて適切な挨拶メッセージを表示
 */

class GreetingApp {
  constructor() {
    // DOM要素の取得
    this.timeElement = document.getElementById('timeText');
    this.greetingElement = document.getElementById('greetingText');
    this.iconElement = document.getElementById('iconEmoji');
    this.bodyElement = document.body;
    
    // 時間帯設定
    this.timeRanges = {
      morning: { start: 5, end: 10, message: 'おはようございます', icon: '🌅' },
      afternoon: { start: 11, end: 17, message: 'こんにちは', icon: '☀️' },
      evening: { start: 18, end: 23, message: 'こんばんは', icon: '🌙' },
      lateNight: { start: 0, end: 4, message: 'こんばんは', icon: '🌃' }
    };
    
    // 初期化
    this.init();
  }
  
  /**
   * アプリケーションの初期化
   */
  init() {
    // 初回実行
    this.updateTimeAndGreeting();
    
    // 1分ごとに更新（正確に分が変わるタイミングで実行）
    this.scheduleNextUpdate();
    
    console.log('時間帯別挨拶アプリが起動しました');
  }
  
  /**
   * 現在時刻を取得してフォーマット
   * @returns {Object} 時刻情報オブジェクト
   */
  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // HH:MM形式でフォーマット
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    return {
      hours,
      minutes,
      formattedTime,
      timestamp: now
    };
  }
  
  /**
   * 時間帯を判定して適切なメッセージを取得
   * @param {number} hours - 現在の時刻（24時間形式）
   * @returns {Object} 時間帯情報オブジェクト
   */
  getTimeBasedGreeting(hours) {
    // 時間帯の判定
    if (hours >= this.timeRanges.morning.start && hours <= this.timeRanges.morning.end) {
      return { ...this.timeRanges.morning, period: 'morning' };
    } else if (hours >= this.timeRanges.afternoon.start && hours <= this.timeRanges.afternoon.end) {
      return { ...this.timeRanges.afternoon, period: 'afternoon' };
    } else if (hours >= this.timeRanges.evening.start && hours <= 23) {
      return { ...this.timeRanges.evening, period: 'evening' };
    } else {
      // 0時〜4時59分（深夜）
      return { ...this.timeRanges.lateNight, period: 'evening' };
    }
  }
  
  /**
   * UIを更新（時刻、挨拶、テーマ）
   */
  updateTimeAndGreeting() {
    const timeInfo = this.getCurrentTime();
    const greetingInfo = this.getTimeBasedGreeting(timeInfo.hours);
    
    // 時刻表示の更新
    this.updateTimeDisplay(timeInfo.formattedTime);
    
    // 挨拶メッセージの更新
    this.updateGreetingMessage(greetingInfo.message);
    
    // アイコンの更新
    this.updateIcon(greetingInfo.icon);
    
    // テーマ（背景色）の更新
    this.updateTheme(greetingInfo.period);
    
    // コンソールログ（デバッグ用）
    console.log(`更新: ${timeInfo.formattedTime} - ${greetingInfo.message} (${greetingInfo.period})`);
  }
  
  /**
   * 時刻表示を更新
   * @param {string} timeString - フォーマット済み時刻文字列
   */
  updateTimeDisplay(timeString) {
    if (this.timeElement) {
      // アニメーション効果付きで更新
      this.timeElement.style.opacity = '0.5';
      setTimeout(() => {
        this.timeElement.textContent = timeString;
        this.timeElement.style.opacity = '1';
      }, 150);
    }
  }
  
  /**
   * 挨拶メッセージを更新
   * @param {string} message - 挨拶メッセージ
   */
  updateGreetingMessage(message) {
    if (this.greetingElement && this.greetingElement.textContent !== message) {
      // フェードアウト → テキスト変更 → フェードイン
      this.greetingElement.style.opacity = '0';
      this.greetingElement.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        this.greetingElement.textContent = message;
        this.greetingElement.style.opacity = '1';
        this.greetingElement.style.transform = 'translateY(0)';
      }, 300);
    }
  }
  
  /**
   * アイコンを更新
   * @param {string} icon - 表示するアイコン
   */
  updateIcon(icon) {
    if (this.iconElement && this.iconElement.textContent !== icon) {
      // バウンス効果付きで更新
      this.iconElement.style.transform = 'scale(0.8)';
      setTimeout(() => {
        this.iconElement.textContent = icon;
        this.iconElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
          this.iconElement.style.transform = 'scale(1)';
        }, 200);
      }, 150);
    }
  }
  
  /**
   * テーマ（背景）を更新
   * @param {string} period - 時間帯（morning/afternoon/evening）
   */
  updateTheme(period) {
    const themes = ['morning', 'afternoon', 'evening'];
    
    // 既存のテーマクラスを削除
    themes.forEach(theme => {
      this.bodyElement.classList.remove(theme);
    });
    
    // 新しいテーマクラスを追加
    this.bodyElement.classList.add(period);
  }
  
  /**
   * 次回更新のスケジュール設定
   * 分が変わるタイミングで正確に実行されるように調整
   */
  scheduleNextUpdate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // 次の分の開始まで残り時間を計算
    const timeToNextMinute = (60 - seconds) * 1000 - milliseconds;
    
    // 最初の更新をスケジュール
    setTimeout(() => {
      this.updateTimeAndGreeting();
      
      // その後は1分間隔で定期実行
      setInterval(() => {
        this.updateTimeAndGreeting();
      }, 60000); // 60秒 = 60000ミリ秒
      
    }, timeToNextMinute);
  }
}

/**
 * DOMが読み込まれた後にアプリケーションを起動
 */
document.addEventListener('DOMContentLoaded', () => {
  // アプリケーションのインスタンスを作成
  const app = new GreetingApp();
  
  // エラーハンドリング
  window.addEventListener('error', (event) => {
    console.error('アプリケーションエラー:', event.error);
  });
  
  // ページの可視性変更時の処理
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // ページが再表示されたときに即座に更新
      app.updateTimeAndGreeting();
    }
  });
});