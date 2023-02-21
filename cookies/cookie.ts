import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { IDataAtToken } from '../interface/IDataAtToken';

export const saveLoginResponse = (response: any) => {
  saveAccessToken(response.accessToken);
  saveRefreshToken(response.refreshToken);
};

//cookies
/**
 *
 * @param response accesstoken itself
 * saves accesstoken in cookie
 */
export function saveAccessToken(accessToken: string) {
  Cookies.set('accessToken', accessToken);
}

/**
 *
 * @returns accesstoken as string
 */
export function getAccessToken(): string {
  const obj = Cookies.get('accessToken');
  if (obj === 'undefined') return '';
  return obj ? obj : '';
}
/**
 *
 * @param response refreshtoken as string
 * @param date expiry of refreshtoken as num in milisec, which is converted to UTC
 * saves in cookie as long as expiry time is greater than now.
 */
export function saveRefreshToken(refreshToken: string) {
  try {
    const tokenData = jwt(refreshToken) as IDataAtToken;
    const date = tokenData.expiredAt;
    Cookies.set('refreshToken', refreshToken, { expires: new Date(date) });
  } catch {
    Cookies.remove('refreshToken');
  }
}

/**
 *
 * @returns refreshtoken as string from cookie
 */
export function getRefreshToken(): string {
  const obj = Cookies.get('refreshToken');
  if (obj === 'undefined') return '';
  return obj ? obj : '';
}
