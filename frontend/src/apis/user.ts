import { client } from '@/apis';

export const join = (args: { nickname: string; email: string; password: string }) =>
  client.post('/members', args);

export const login = (args: { email: string; password: string }) => client.post('/login', args);

export const getMe = () =>
  client.get('/members/me', {
    transformResponse: stringResponse => {
      const parsedData = JSON.parse(stringResponse);

      if (parsedData.error) {
        return parsedData;
      }

      return parsedData.data;
    },
  });
