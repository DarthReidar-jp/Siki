import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'; // API関数のインポートが必要です


// onSubmit プロパティの型を持つインターフェースを定義します。
interface LoginFormProps {
  onLoginSuccess: () => void; // サインアップ成功時のコールバック
}

// LoginFormProps インターフェースを使用して、props の型を指定します。
const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // event パラメーターに React.FormEvent<HTMLFormElement> 型を指定します。
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      console.log('Login successful');
      onLoginSuccess();
      navigate('/'); // ログイン成功後のリダイレクト先
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;