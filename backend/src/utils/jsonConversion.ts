// jsonConversionUtils.ts

/**
 * JSONデータから不要な要素を削除し、必要なデータのみをクリーニングする
 * @param json 元のJSONデータ
 * @returns クリーニングされたJSONデータ
 */
interface Page {
    title: string;
    lines: string[];
}

const MAX_CHARACTERS_PER_PAGE = 3000;

const cleanAndSplitJSON = (json: any): Page[] => {
    if (!json || !Array.isArray(json.pages)) {
        console.error('Invalid input: json is undefined or pages property is not an array');
        return [];  // あるいはエラーハンドリングをする
    }

    // pages要素のみを抽出
    const pages: Page[] = json.pages.map((page: any): Page => {
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

        // 新しいページを生成する関数
        const newPages: Page[] = [];
        pages.forEach(page => {
            let currentLines: string[] = [];
            let currentCharCount = 0;
            let pageNumber = 1;
    
            page.lines.forEach(line => {
                const newTitle = `${page.title} Part ${pageNumber}`;
                if (currentCharCount + line.length + newTitle.length > MAX_CHARACTERS_PER_PAGE) {
                    newPages.push({ title: page.title, lines: [newTitle, ...currentLines] });
                    pageNumber++;
                    currentLines = [line];
                    currentCharCount = line.length;
                } else {
                    currentLines.push(line);
                    currentCharCount += line.length;
                }
            });
    
            // 残りの行を追加
            if (currentLines.length > 0) {
                newPages.push({ title: page.title, lines: [`${page.title} Part ${pageNumber}`, ...currentLines] });
            }
        });
    
        return newPages;
    };


/**
 * EditorState形式でJSONノードを生成する
 * @param json 元のJSONデータ
 * @returns EditorState形式のJSONオブジェクトの配列
 */
const createEditorState = (json: any) => {
    const cleanedPages = cleanAndSplitJSON(json);

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