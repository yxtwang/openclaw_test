(function(){
  const form = document.getElementById('loginForm');
  const emailEl = document.getElementById('email');
  const pwdEl = document.getElementById('password');
  const toggle = document.getElementById('togglePwd');
  const error = document.getElementById('error');
  const success = document.getElementById('success');
  const submitBtn = document.getElementById('submitBtn');
  const remember = document.getElementById('remember');

  // API 配置：如果需要请求外部后端，可在这里修改为完整的 base URL（例如 https://api.example.com）
  const API_BASE = '';
  const LOGIN_URL = (API_BASE ? API_BASE.replace(/\/$/, '') : '') + '/api/auth/login';

  // load saved email
  if(localStorage.getItem('rememberedEmail')){
    emailEl.value = localStorage.getItem('rememberedEmail');
    remember.checked = true;
  }

  toggle.addEventListener('click', ()=>{
    const t = pwdEl.getAttribute('type') === 'password' ? 'text' : 'password';
    pwdEl.setAttribute('type', t);
    toggle.textContent = t === 'password' ? '👁️' : '🙈';
  });

  function showError(msg){
    success.classList.add('hidden');
    error.textContent = msg;
    error.classList.remove('hidden');
  }
  function showSuccess(msg){
    error.classList.add('hidden');
    success.textContent = msg;
    success.classList.remove('hidden');
  }

  function validate(email, pwd){
    if(!email) return '请输入邮箱';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email)) return '邮箱格式不正确';
    if(!pwd) return '请输入密码';
    if(pwd.length < 8) return '密码长度至少 8 位';
    return '';
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    submitBtn.disabled = true;
    const email = emailEl.value.trim();
    const pwd = pwdEl.value;

    const v = validate(email, pwd);
    if(v){ showError(v); submitBtn.disabled = false; return; }

    showSuccess('正在登录……');

    try{
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pwd, remember: remember.checked })
      });

      const data = await res.json().catch(()=>({}));

      if(res.ok){
        // 根据后端返回保存 token 或者使用 cookie（推荐在生产使用 HttpOnly cookie）
        if(data.token){ localStorage.setItem('authToken', data.token); }
        if(remember.checked){ localStorage.setItem('rememberedEmail', email); } else { localStorage.removeItem('rememberedEmail'); }
        showSuccess('登录成功，正在跳转……');
        setTimeout(()=>{ window.location.href = data.redirect || '/'; }, 700);
      } else {
        showError(data.error || data.message || '登录失败，请检查凭证');
        submitBtn.disabled = false;
      }
    } catch(err){
      showError('无法连接到服务器，请稍后重试');
      submitBtn.disabled = false;
    }
  });
})();
