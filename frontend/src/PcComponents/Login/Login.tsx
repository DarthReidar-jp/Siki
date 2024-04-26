import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    window.location.href = `${backendUrl}auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Googleでログインしてください</h1>
        <button 
          className="w-full h-12 px-6 text-white font-semibold bg-black rounded-md hover:bg-gray-800 transition duration-300"
          onClick={handleGoogleLogin}
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
}

export default Login;
