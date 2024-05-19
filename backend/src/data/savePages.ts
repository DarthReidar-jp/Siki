import Page from '../models/page';
import { editorStateToLines } from '../utils/editorStateToLines';
import { getPageVector } from '../llm/openaiEmbedding';

async function createAndSavePage(root: any, userId: string, projectId?: string) {
    const lines = editorStateToLines(root.root);
    const title = lines.length > 0 ? lines[0] : 'Untitled';
    const content = lines.slice(1).join('');
    const vectorContent = title + content;
    const vector = await getPageVector(vectorContent);
    const newPage = new Page({
        userId,
        title,
        editorState: root,
        content,
        projectId,
        vector,
        createdAt: new Date(),
    });
    await newPage.save();
    console.log({ title }, "を保存しました");
    return newPage;
}

export async function savePage(page: any, userId: string, projectId?: string) {
    return await createAndSavePage(page, userId, projectId);
}

export async function savePages(pages:any, userId: string,projectId?:string) {
    for (const page of pages) {
        const pageRoot = page.root;
        await createAndSavePage(pageRoot, userId, projectId);
    }
};

