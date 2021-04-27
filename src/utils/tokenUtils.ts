import { jwtDecode } from './jwtDecode';
import { getPreLocation } from './preLocationUtils';
import ls from './localStorageHelper';

const getToken = (): string | undefined => {
  const preLocation = getPreLocation();
  const rootPath = window.location.pathname.split('/')[0] || (preLocation && preLocation.split('/')[1]) || 'scada';
  const tFlag = ls.getItem('_t_flag');
  if (tFlag === 2) {
    let key = '';
    if (rootPath === 'config') {
      key = '_c_token';
    } else {
      key = '_s_token';
    }
    return ls.getItem(key);
  }
  return ls.getItem('token');
}

const getTokenFlag = (token: string) => {
  const payload = jwtDecode(token);
  return payload.flag;
}

const setToken = (token: string): void => {
  const tokenParts = token.split('.');
  if (tokenParts.length === 3) {
    ls.setItem('token', token);
    ls.setItem('_t_flag', 1);
  } else if (tokenParts.length === 6) {
    const firstToken = tokenParts.slice(0, 3).join('.');
    const lastToken = tokenParts.slice(3).join('.');
    // 配置态和监控态的token分开存储
    ls.setItem(`_${getTokenFlag(firstToken)}_token`, firstToken);
    ls.setItem(`_${getTokenFlag(lastToken)}_token`, lastToken);
    ls.setItem('_t_flag', 2);
  }
}

function clearToken() {
  ls.removeItem('_t_flag');
  ls.removeItem('token');
  ls.removeItem('_c_token');
  ls.removeItem('_s_token');
}

export { getToken, setToken, clearToken };
