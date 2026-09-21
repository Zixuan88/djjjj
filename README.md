# 智慧通勤風險通知系統 - 官方網站

響應式（RWD）網頁，包含：
- 最新消息
- 數據圖表（目前為模擬資料，未來可連接 MySQL）

## 使用方式

1. 建立 GitHub Repository（建議名稱：`smart-commute-web`）
2. 上傳本專案所有檔案
3. 到 Repository → Settings → Pages
4. Source 選擇 `Deploy from a branch`
5. Branch 選 `main`，資料夾選 `/ (root)`
6. 儲存後等待約 1 分鐘，即可透過 `https://你的帳號.github.io/smart-commute-web/` 瀏覽

## 未來連接 MySQL 的建議方式

1. 後端（Python Flask / FastAPI 或 Node.js）連接 MySQL
2. 提供 API 端點，例如：`GET /api/daily-stats`
3. 修改 `js/main.js` 中的 `fetchChartData()` 函式，改為真正的 `fetch()` 呼叫
