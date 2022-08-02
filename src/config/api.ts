import { create } from 'apisauce';

export const apiWrapper = create({
  baseURL: `http://localhost:3000/api/v2`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const loginRequestTransform = (headers: any) => {
  apiWrapper.addRequestTransform(request => {
    request.headers = {...request.headers, ...headers};
  });
};

export const logoutRequestTransform = () => {
  apiWrapper.addRequestTransform(request => {
    request.headers = {};
  });
};

export const apiUrls = {
  auth: '/auth/sign_in',
  news: {
    list: '/news',
    itemShow: (id: number): string => `/news/${id}`,
  },
};
