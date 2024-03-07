import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth'; // API関数のインポートが必要です

interface SignupFormProps {
  onSignupSuccess: () => void; // サインアップ成功時のコールバック
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signup(username, email, password);
      console.log('signup successful');
      onSignupSuccess(); // サインアップ成功時のコールバックを呼び出す
      navigate('/'); 
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
