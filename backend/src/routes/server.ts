import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('server', {
    serverStatus: '稼働中' // ここにサーバーの状態を動的に渡すことができます
  });
});

export default router;
