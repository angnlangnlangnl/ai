/* js/auth.js - 最小可用版 */
const AUTH_KEY  = 'aicontrol_logged_in';
const AUTH_USER = 'aicontrol_user';

function doLogin(username, password) {
    const USERS = {
        'admin':    '123456',
        'yunshan':  'yunshan2026',
        'operator': 'op123456'
    };
    if (USERS[username] && USERS[username] === password) {
        sessionStorage.setItem(AUTH_KEY, '1');
        sessionStorage.setItem(AUTH_USER, username);
        return { ok: true, msg: '登录成功' };
    }
    return { ok: false, msg: '账号或密码错误' };
}

function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === '1';
}

function getCurrentUser() {
    return sessionStorage.getItem(AUTH_USER) || '未登录';
}

function doLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_USER);
    location.href = 'login.html';
}

function requireLogin() {
    if (!isLoggedIn()) {
        const path = location.pathname;
        const loginUrl = path.includes('/pages/') ? '../login.html' : 'login.html';
        location.replace(loginUrl);
        return false;
    }
    return true;
}

function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        location.replace('index.html');
        return true;
    }
    return false;
}
