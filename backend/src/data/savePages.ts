import Page from '../models/page';
import { editorStateToLines } from '../utils/editorStateToLines';
import { getPageVector } from '../llm/openaiEmbedding';

export async function savePage(page:any, userId: string) {
    const root = page;
    const lines = editorStateToLines(root.root);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.slice(1).join('');
    const vector = await getPageVector(content);
    const newPage = new Page({
        userId,
        title,
        editorState: root,
        content,
        vector,
        createdAt: new Date(),
    });
    await newPage.save();
    return newPage;
};

// ページ保存処理
export async function savePages(pages:any, userId: string) {
    for (const page of pages) {
        const newPage = await savePage(page, userId)
        const title = newPage.title;
        console.log({ title }, "を保存しました");
    }
};

export async function saveProjectPage(page:any, userId: string, projectId:string) {
    const root = page.root;
    const lines = editorStateToLines(root.root);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.slice(1).join('');
    const vector = await getPageVector(content);
    const newPage = new Page({
        userId,
        title,
        editorState: root,
        content,
        vector,
        createdAt: new Date(),
    });
    await newPage.save();
    console.log({ title }, "を保存しました");
    return newPage;
};

