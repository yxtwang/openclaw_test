const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Demo credential
const DEMO_EMAIL = 'user@example.com';
const DEMO_PWD = 'password123';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: '缺少邮箱或密码' });
  if (email === DEMO_EMAIL && password === DEMO_PWD) {
    return res.json({
      token: 'demo-token-abcdef123456',
      user: { id: '1', email: DEMO_EMAIL, name: 'Demo User' },
      redirect: '/dashboard'
    });
  }
  return res.status(401).json({ error: '邮箱或密码不正确' });
});

app.get('/', (req, res) => res.send('Demo auth server running'));

app.listen(PORT, () => console.log(`Auth demo server listening on port ${PORT}`));
