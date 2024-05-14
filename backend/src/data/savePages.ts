import Page from '../models/page';
import { editorStateToLines } from '../utils/editorStateToLines';
import { getPageVector } from '../llm/openaiEmbedding';

export async function savePage(page:any, userId: string, projectId?:string) {
    const root = page;
    const lines = editorStateToLines(root.root);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.slice(1).join('');
    const vectorContent = title+content;
    const vector = await getPageVector(vectorContent);
    const newPage = new Page({
        userId,
        title,
        editorState: root,
        content,
        projectId:projectId,
        vector,
        createdAt: new Date(),
    });
    await newPage.save();
    return newPage;
};

// ページ保存処理
export async function savePages(pages:any, userId: string,projectId?:string) {
    for (const page of pages) {
        const newPage = await savePagefromJSON(page, userId, projectId)
        const title = newPage.title;
        console.log({ title }, "を保存しました");
    }
};

export async function savePagefromJSON(page:any, userId: string, projectId?:string) {
    const root = page.root;
    const lines = editorStateToLines(root.root);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.slice(1).join('');
    const vectorContent = title+content;
    const vector = await getPageVector(vectorContent);
    const newPage = new Page({
        userId,
        title,
        editorState: root,
        content,
        projectId:projectId,
        vector,
        createdAt: new Date(),
    });
    await newPage.save();
    return newPage;
};

export async function saveProjectPage(page:any, userId: string, projectId:string) {
    const root = page;
    const lines = editorStateToLines(root.root);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.slice(1).join('');
    const vectorContent = title+content;
    const vector = await getPageVector(vectorContent);
    const newPage = new Page({
        userId,
        title,
        editorState: root,
        content,
        projectId:projectId,
        vector,
        createdAt: new Date(),
    });
    await newPage.save();
    console.log({ title }, "を保存しました");
    return newPage;
};

