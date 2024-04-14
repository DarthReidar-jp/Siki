// jsonConversionUtils.ts

/**
 * JSONデータから不要な要素を削除し、必要なデータのみをクリーニングする
 * @param json 元のJSONデータ
 * @returns クリーニングされたJSONデータ
 */
interface Page {
    title: string;
    lines: string[];
    hasPart: boolean;
  }
  
  const MAX_CHARACTERS_PER_PAGE = 3000;
  
  const cleanAndSplitJSON = (json: any): Page[] => {
    if (!json || !Array.isArray(json.pages)) {
      console.error('Invalid input: json is undefined or pages property is not an array');
      return [];
    }
  
    const pages: Page[] = json.pages.map((page: any): Page => {
      delete page.id;
      delete page.created;
      delete page.updated;
  
      const normalizedLines = page.lines.map((line: string) => line.replace(/\t/g, ''));
      
      return {
        title: page.title,
        lines: normalizedLines,
        hasPart: false
      };
    });
  
    const newPages: Page[] = [];
  
    pages.forEach(page => {
      let currentLines: string[] = [];
      let currentCharCount = 0;
      let pageNumber = 1;
  
      page.lines.forEach(line => {
        const newTitle = page.hasPart ? `${page.title} Part ${pageNumber}` : page.title;
        
        if (currentCharCount + line.length + newTitle.length > MAX_CHARACTERS_PER_PAGE) {
          newPages.push({
            title: newTitle,
            lines: [...currentLines],
            hasPart: page.hasPart || pageNumber > 1
          });
          pageNumber++;
          currentLines = [line];
          currentCharCount = line.length;
        } else {
          currentLines.push(line);
          currentCharCount += line.length;
        }
      });
  
      if (currentLines.length > 0) {
        const finalTitle = page.hasPart ? `${page.title} Part ${pageNumber}` : page.title;
        newPages.push({
          title: finalTitle,
          lines: [...currentLines],
          hasPart: page.hasPart || pageNumber > 1
        });
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