# posts-mongoose-kata

#### 建立 package.json 和引入 mongoose、dotenv 套件
- 使用 ```npm init```
- 引入 ```npm install mongoose dotenv --save```

#### 建立模組和設定環境
- http、mongoose、dotenv
- headers
- handles：successHandle、errHandle、notFoundHandle
- server.js
- models/todo.js：定義 Schema
- config.env：PORT、DATABASE、DATABASE_PASSWORD
- .gitignore：node_modules/、*.env
- package.json：部署 Heroku(檢查 npm start 所運行檔案、加入 Node.js 運行的版本號)

#### 監聽 port
- Heroku 設置環境變數 ```http.createServer(reqListener).listen(process.env.PORT);```

#### 資料庫連線
- 連接環境變數檔案：```dotenv.config({ path: './config.env' });```
- 替換 Password：```const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);```
- 建立連線：```mongoose.connect(DB)```

#### 取得資料
- 變數 body：將檔案拆解成一個個 TCP 封包，分別儲存在參數 chunk

#### 判斷頁面網址和方法，開發 API，回傳 JSON
- GET
- POST
- DELETE
- PATCH
- OPTIONS
- 404 頁面

#### 使用 Git 記錄
- 使用 ```git init```，進行 commit

#### 透過 Heroku CLI 部署 Heroku
- 登入 Heroku：``` heroku login ```
- 建立遠端主機：``` heroku create ```
- 檔案推上遠端：``` git push heroku { 主線名稱 } ```
- 開啟遠端主機：``` heroku open ```

#### 匯出 POSTMAN JSON 檔案，上傳至 GitHub
- 匯出
- GitHub 建立新專案後，上傳檔案
