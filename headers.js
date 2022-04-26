const headers = {
  // 允許通過以下方式請求 URL：其他伺服器 IP 皆可訪問
  'Access-Control-Allow-Origin': '*',
  // 跨網域可以讀取哪些 header 資訊
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  // 跨網域可以使用哪些 method 方法
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PATCH, DELETE',
  // 使用 JSON 格式來解析
  'Content-Type': 'application/json'
}

module.exports = headers;