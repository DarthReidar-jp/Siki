# Siki（セマンティックナレッジツール）

# 仕様ツール
- MongoDB Atlas
- Google Cloud 
    - Google Oauth

# ライブラリ、フレームワーク
- Node.js
- Express
- React
- tailwindcss
- Langchain
- llamaIndex

# 環境変数
バックエンド
```
//OpenAI系
OPENAI_API_KEY=
OPENAI_CHAT_MODEL=
OPENAI_EMBEDDING_MODEL=

//MongoDB系
MONGODB_URI=
MONGODB_DATABASE=
MONGODB_COLLECTION=
MONGODB_VECTOR_DATABASENAME=
MONGODB_VECTORS=
MONGODB_VECTOR_INDEX=

//Auth系
JWT_SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACKURL=/api/auth/google/callback

//URL系
FRONTEND_URL=http://localhost:3000/
FRONTEND_URL_CORS_OPTIONS=http://localhost:3000

//COHERE系
COHERE_API_KEY=

//LangChain
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=
//セッションキー
SESSION_SECRET_KEY=

//Claud
ANTHROPIC_API_KEY=
```

フロントエンド
```
REACT_APP_BACKEND_URL=http://localhost:8000/api/
REACT_APP_FRONTEND_URL=http://localhost:3000/
```
