import { Request, Response, NextFunction } from 'express';

// この関数はミドルウェアとして機能し、認証状態に基づいてレスポンスを返します。
function verifyConnectSid(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) { // ユーザーが認証されているか確認
        console.log('Logged-in user:', req.user);
        next(); // 認証されているので、次のミドルウェアまたはルートハンドラーに処理を移す
    } else {
        console.log('取得できない');
        res.status(401).json({ message: 'Unauthorized: User is not authenticated' }); // 認証されていない場合は401ステータスで応答
    }
}

export { verifyConnectSid };
