import React from 'react';
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

const MarkdownPlugin = () => {
  return <MarkdownShortcutPlugin transformers={TRANSFORMERS} />;
};

export default MarkdownPlugin;
