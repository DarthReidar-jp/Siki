//文字列抽出関数
const extractTexts = (node: any): string[] => {
    if (!node) return [];
    if (node.text) return [node.text]; 
    return node.children?.flatMap(extractTexts) || [];
  };

export {extractTexts};