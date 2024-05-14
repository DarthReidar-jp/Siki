import { cleanAndSplitScrapboxJSON } from './importScrapboxJSON';
/**
 * EditorState形式でJSONノードを生成する
 * @param json 元のJSONデータ
 * @returns EditorState形式のJSONオブジェクトの配列
 */
const createEditorState = (json: any) => {
    const cleanedPages = cleanAndSplitScrapboxJSON(json);
    const editorStates = cleanedPages.map((page: any) => {
        const children = page.lines.map((line: string) => {
            return {
                children: [{
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: line,
                    type: "text",
                    version: 1
                }],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1
            };
        });

        return {
            root: {
                root: {
                    children: children,
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1
                }
            }

        };
    });
    console.log(JSON.stringify(editorStates, null, 2));

    return editorStates;
}



export { createEditorState };