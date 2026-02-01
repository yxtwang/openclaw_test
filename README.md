# openclaw_test
验证openclaw
# 登录页面示例

这是一个简单的静态登录页面示例，包含前端校验和演示用的模拟登录逻辑。

主要文件：
- [index.html](index.html) — 页面入口
- [styles.css](styles.css) — 样式
- [js/script.js](js/script.js) — 客户端脚本，包含校验和模拟认证

快速运行：

1. 直接在浏览器中打开 [index.html](index.html)（适用于本地环境）。

2. 或者使用简单的 HTTP 服务器（推荐）：

```bash
# 在项目根目录运行：
python3 -m http.server 8000
# 然后打开 http://localhost:8000
```

示例账号（仅用于示范）：
- 邮箱：user@example.com
- 密码：password123

如果需要，我可以：
- 把表单提交到真实后端（提供 API 格式）
- 增加更严格的前端/后端验证
- 加入样式/主题切换或社交登录按钮

想先做哪个？

API 规范（示例）

- 登录接口：`POST /api/auth/login`
	- 请求头：`Content-Type: application/json`
	- 请求体（JSON）：
		- `email` — 用户邮箱（string，必需）
		- `password` — 用户密码（string，必需）
		- `remember` — 是否记住（boolean，可选）
	- 成功响应（HTTP 200）：
		```json
		{
			"token": "<jwt-token>",
			"user": { "id": "...", "email": "...", "name": "..." },
			"redirect": "/dashboard"
		}
		```
	- 失败响应（HTTP 4xx）：
		```json
		{ "error": "说明登录失败的原因" }
		```

注意事项：
- 开发/演示时可以在前端保存 `token`（如 `localStorage`），生产环境推荐使用 `HttpOnly` 的安全 cookie 来保存会话/令牌，避免 XSS 风险。
- 如果后端在不同域名上部署，请确保启用 CORS，并根据认证方式选择 `credentials: 'include'`。
- 在 `js/script.js` 中可以修改 `API_BASE` 变量指向真实后端，例如 `https://api.example.com`。

如何测试：
1. 启动后端服务并确保 `POST /api/auth/login` 可用。
2. 修改 `js/script.js` 顶部的 `API_BASE` 为后端地址（如果后端不在同一域名）。
3. 打开页面并提交表单，成功后会将 `token` 保存到 `localStorage`（示例实现）。
