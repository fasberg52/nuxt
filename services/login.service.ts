import { baseUrl } from '~/constant/api';
import { jwtDecode } from 'jwt-decode';

export const Login = async (username: string, password: string) => {
  try {
    const response: any = await $fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      body: { username, password },
    });

    const token = response.data.access_token;
    const decodedToken = jwtDecode<{ roles: number }>(token);
    console.log(`decodedToken >> ${JSON.stringify(decodedToken, null, 2)}`);
    return { isSuccess: true, data: { token, roles: decodedToken.roles } };
  } catch (err) {
    console.error('Login failed:', err);
    return { isSuccess: false, data: null };
  }
};
