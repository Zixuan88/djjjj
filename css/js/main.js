// ========== 最新消息資料（未來可改成從 API / MySQL 讀取） ==========
const newsData = [
  {
    date: "2026-09-21",
    title: "系統正式上線",
    content: "智慧通勤風險通知系統已透過 GitHub Actions 開始每日自動推播，請確認 Telegram 已成功接收訊息。"
  },
  {
    date: "2026-09-20",
    title: "圖表功能預告",
    content: "本網站已預留數據圖表區塊，未來將連接 MySQL 資料庫，顯示歷史溫度、降雨與 AQI 趨勢。"
  },
  {
    date: "2026-09-18",
    title: "門檻值說明",
    content: "降雨機率 ≥60%、最高溫 ≥33°C、AQI ≥100 時會分別發出提醒，多項條件可同時成立。"
  }
];

// ========== 模擬圖表資料（未來改成從 MySQL API 取得） ==========
// 預留函式：未來可替換成 fetch('/api/weather-history') 等
async function fetchChartData() {
  // 目前使用模擬資料
  // 未來範例：
  // const res = await fetch('https://your-api.com/api/daily-stats');
  // return await res.json();

  return {
    labels: ["09/15", "09/16", "09/17", "09/18", "09/19", "09/20", "09/21"],
    temperature: [31, 32, 34, 33, 30, 29, 31],
    rainProbability: [20, 45, 70, 55, 30, 15, 40],
    aqi: [65, 78, 95, 110, 88, 72, 85]
  };
}

// ========== 渲染最新消息 ==========
function renderNews() {
  const grid = document.getElementById("newsGrid");
  grid.innerHTML = newsData.map(item => `
    <article class="news-card">
      <div class="news-date">${item.date}</div>
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    </article>
  `).join("");
}

// ========== 建立圖表 ==========
async function initCharts() {
  const data = await fetchChartData();

  // 溫度圖
  new Chart(document.getElementById("tempChart"), {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [{
        label: "最高溫度 (°C)",
        data: data.temperature,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: false } }
    }
  });

  // 降雨機率圖
  new Chart(document.getElementById("rainChart"), {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        label: "降雨機率 (%)",
        data: data.rainProbability,
        backgroundColor: "#3b82f6",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  // AQI 圖
  new Chart(document.getElementById("aqiChart"), {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [{
        label: "AQI",
        data: data.aqi,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ========== 手機選單 ==========
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("active");
});

// 點擊連結後自動關閉手機選單
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("active");
  });
});

// ========== 初始化 ==========
document.addEventListener("DOMContentLoaded", () => {
  renderNews();
  initCharts();
});
