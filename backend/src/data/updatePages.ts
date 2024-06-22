
import { getPageVector } from '../llm/openaiEmbedding';
import { editorStateToLines } from '../utils/editorStateToLines';

export async function updatePages(page:any,root:any) {
    page.editorState = root;
    const { root: rootNode } = root;  
    page.lines = editorStateToLines(rootNode);
    page.title =  page.lines.length > 0 ? page.lines[0] : 'Untitled';
    page.content = page.lines.slice(1).join('');
    page.vector = await getPageVector(page.content);
    await page.save();
    return page
}

