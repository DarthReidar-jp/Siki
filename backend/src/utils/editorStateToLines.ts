//EditorStateから文字列だけを抽出する関数
const editorStateToLines = (node: any): string[] => {
    if (!node) return [];
    if (node.text) return [node.text]; 
    return node.children?.flatMap(editorStateToLines) || [];
  };

export { editorStateToLines };