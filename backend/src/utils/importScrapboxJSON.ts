/**
 * JSONデータから不要な要素を削除し、必要なデータのみをクリーニングする
 * @param json 元のJSONデータ
 * @returns クリーニングされたJSONデータ
 */

interface Page {
    title: string;
    lines: string[];
}

const MAX_CHARACTERS_PER_PAGE = 1000;

// エントリーポイント関数: JSONを検証し、処理する
const cleanAndSplitScrapboxJSON = (json: any): Page[] => {
    if (!json || !Array.isArray(json.pages)) {
        console.error('Invalid input: json is undefined or pages property is not an array');
        return []; 
    }
    console.log(json.pages);
    const pages = processPages(json.pages);
    console.log(pages);
    
    return pages;
};

// ページの処理と分割を行う
const processPages = (pages: any[]): Page[] => {
    const cleanedPages = cleanScrapboxPages(pages);
    console.log(cleanedPages);
    return splitScrapboxPagesIfNeeded(cleanedPages);
};

// ページをクリーニングする
const cleanScrapboxPages = (pages: any[]): Page[] => {
    return pages.map(cleanScrapboxPage);
};

// 単一ページをクリーニングする
const cleanScrapboxPage = (page: any): Page => {
    const normalizedLines = page.lines.map((line: string) => line.replace(/\t/g, ''));
    return {
        title: page.title,
        lines: normalizedLines
    };
};

// 必要に応じてページを分割する
const splitScrapboxPagesIfNeeded = (pages: Page[]): Page[] => {
    const newPages: Page[] = [];
    pages.forEach(page => {
        newPages.push(...splitScprapboxPage(page));
    });
    return newPages;
};

// ページを分割する
const splitScprapboxPage = (page: Page): Page[] => {
    const result: Page[] = [];
    let currentLines: string[] = [];
    let currentCharCount = 0;
    let pageNumber = 1;
    let hasSplit = false;

    page.lines.forEach(line => {
        if (currentCharCount + line.length > MAX_CHARACTERS_PER_PAGE) {
            const newTitle = `${page.title} Part ${pageNumber}`;
            result.push({ title: newTitle, lines: [newTitle, ...currentLines] });
            currentLines = [line];
            currentCharCount = line.length;
            pageNumber++;
            hasSplit = true;
        } else {
            currentLines.push(line);
            currentCharCount += line.length;
        }
    });

    if (currentLines.length > 0) {
        const finalTitle = hasSplit ? `${page.title} Part ${pageNumber}` : page.title;
        result.push({ title: finalTitle, lines: [finalTitle, ...currentLines] });
    }
    return result;
};

export { cleanAndSplitScrapboxJSON };