import { getRefreshToken } from '../cookies/cookie';
import api from './api';
const ENDPOINT_LOGIN = '/signin';
const ENDPOINT_REGISTER = '/signup';
const ENDPOINT_CHECKEMAIL = '/checkEmail';
const ENDPOINT_LOGOUT = '/signout';
const ENDPOINT_USER = '/user';
/**
 *
 * @param body request's body for user login
 * @returns response from server
 */
export async function login(body: any): Promise<any> {

        const response = await api.post(ENDPOINT_LOGIN, body);
        return response.data;

}

/**
 *
 * @param body request's body for user register
 * @returns response from server
 */
export async function register(body: any): Promise<any> {
  const response = await api.post(ENDPOINT_REGISTER, body);
  return response.data;
  return response.data;
}

/**
 *
 * @param body request's body for user register
 * @returns response from server
 */
export async function checkForEmail(email: string): Promise<any> {
  const response = await api.post(ENDPOINT_CHECKEMAIL, { email });
  return response.data;
}

/**
 *
 * @returns response after logout request
 */
export async function logout(): Promise<any> {
  const response = await api.post(ENDPOINT_LOGOUT, {
    refreshToken: getRefreshToken(),
  });
  return response.data;
}

/**
 *
 * @param body request's body for editing user
 * @returns response from server
 */
export async function editUser(body: any): Promise<any> {
  const response = await api.put(ENDPOINT_USER, body);
  return response.data;
}
