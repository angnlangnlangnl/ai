/* ============================================================
   auth.js - 登录状态管理
   所有页面引入后即可做登录校验
   ============================================================ */

const AUTH_KEY = 'aicontrol_logged_in';
const AUTH_USER = 'aicontrol_user';
const AUTH_TIME = 'aicontrol_login_time';

/* ===== 登录 ===== */
function doLogin(username, password) {
    // ⚠️ 演示账号，真实项目请改成后端 API 校验
    const USERS = {
        'admin':  '123456',
        'yunshan': 'yunshan2026',
        'operator': 'op123456'
    };

    if (USERS[username] && USERS[username] === password) {
        sessionStorage.setItem(AUTH_KEY, '1');
        sessionStorage.setItem(AUTH_USER, username);
        sessionStorage.setItem(AUTH_TIME, Date.now());
        return { ok: true, msg: '登录成功' };
    }
    return { ok: false, msg: '账号或密码错误' };
}

/* ===== 判断是否登录 ===== */
function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === '1';
}

/* ===== 获取当前用户 ===== */
function getCurrentUser() {
    return sessionStorage.getItem(AUTH_USER) || '未登录';
}

/* ===== 退出登录 ===== */
function doLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(AUTH_TIME);
    location.href = 'login.html';
}

/* ===== 页面守卫：未登录自动跳转 ===== */
function requireLogin() {
    if (!isLoggedIn()) {
        // 计算 login.html 的相对路径
        // 如果在 pages/ 目录，需要退一级
        const path = location.pathname;
        const loginUrl = path.includes('/pages/') ? '../login.html' : 'login.html';
        location.replace(loginUrl);
        return false;
    }
    return true;
}

/* ===== 已登录则跳过登录页 ===== */
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        location.replace('index.html');
        return true;
    }
    return false;
}
