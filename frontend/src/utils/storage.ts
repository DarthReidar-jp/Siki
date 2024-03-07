// utils/storage.ts

/**
 * ローカルストレージからトークンを取得する。
 */
export const getToken = () => {
    return localStorage.getItem('userToken');
  };
  
/**
 * トークンをローカルストレージに保存する。
 * @param {string} token - 保存するJWTトークン。
 */
export const saveToken = (token: string) => {
  localStorage.setItem('userToken', token);
};
  
/**
 * ローカルストレージからトークンを削除する。
 */
export const removeToken = () => {
  localStorage.removeItem('userToken');
};
