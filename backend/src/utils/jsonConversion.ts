// jsonConversionUtils.ts

/**
 * JSONデータから不要な要素を削除し、必要なデータのみをクリーニングする
 * @param json 元のJSONデータ
 * @returns クリーニングされたJSONデータ
 */
const creanJSON = (json: any) => {
    if (!json || !Array.isArray(json.pages)) {
        console.error('Invalid input: json is undefined or pages property is not an array');
        return [];  // あるいはエラーハンドリングをする
    }
    // pages要素のみを抽出
    const pages = json.pages.map((page: any) => {
        // 不要なプロパティ(id, created, updated)の削除
        delete page.id;
        delete page.created;
        delete page.updated;

        // linesの文字列正規化（タブの削除）
        const normalizedLines = page.lines.map((line: string) => line.replace(/\t/g, ''));

        // 変換後のページオブジェクトを返す
        return {
            title: page.title,
            lines: normalizedLines
        };
    });

    return pages;
}


/**
 * EditorState形式でJSONノードを生成する
 * @param json 元のJSONデータ
 * @returns EditorState形式のJSONオブジェクトの配列
 */
const createEditorState = (json: any) => {
    const cleanedPages = creanJSON(json);

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

    return editorStates;
}



export { createEditorState };