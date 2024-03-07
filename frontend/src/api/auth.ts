import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth'; // ここにバックエンドのURLを設定

// サインアップ関数
export const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }
      return response.data; // 必要に応じてトークンを保存するなどの処理を追加
    } catch (error) {
      throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const TokenVerification = async (token: string): Promise<boolean> => {
  try {
    // バックエンドのトークン検証エンドポイントにリクエストを送信
    const response = await axios.post('http://localhost:8000/api/auth/tokenVerification', { token });

    // レスポンスのステータスコードが200（成功）の場合は、トークンが有効であることを示す
    if (response.status === 200) {
      // 検証成功
      return true;
    } else {
      // レスポンスコードが200以外の場合は、何らかの理由で検証に失敗したとみなす
      return false;
    }
  } catch (error) {
    // エラーが発生した場合のハンドリング
    if (axios.isAxiosError(error)) {
      // Axiosからのエラーの場合、レスポンスをチェックして詳細情報を取得
      console.error('Error during token verification: ', error.response?.data || error.message);
    } else {
      // Axios以外のエラーの場合
      console.error('An unexpected error occurred during token verification: ', error);
    }
    // エラーが発生した場合は、検証失敗を示すためにfalseを返す
    return false;
  }
};



