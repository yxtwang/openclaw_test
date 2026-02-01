(function(){
  const form = document.getElementById('loginForm');
  const emailEl = document.getElementById('email');
  const pwdEl = document.getElementById('password');
  const toggle = document.getElementById('togglePwd');
  const error = document.getElementById('error');
  const success = document.getElementById('success');
  const submitBtn = document.getElementById('submitBtn');
  const remember = document.getElementById('remember');

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

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    submitBtn.disabled = true;
    const email = emailEl.value.trim();
    const pwd = pwdEl.value;

    const v = validate(email, pwd);
    if(v){ showError(v); submitBtn.disabled = false; return; }

    // simulate authentication
    showSuccess('正在登录……');
    setTimeout(()=>{
      // demo: accept only a fixed credential
      if(email === 'user@example.com' && pwd === 'password123'){
        if(remember.checked){ localStorage.setItem('rememberedEmail', email); } else { localStorage.removeItem('rememberedEmail'); }
        showSuccess('登录成功，正在跳转……');
        // simulate redirect
        setTimeout(()=>{ window.location.href = '#welcome'; }, 800);
      } else {
        showError('邮箱或密码不正确（示例账号：user@example.com / password123）');
        submitBtn.disabled = false;
      }
    }, 700);
  });
})();
