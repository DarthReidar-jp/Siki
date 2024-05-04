import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import MarkdownPlugin from './lexical-plugin/MarkdownPlugin';
import LexicalAutoLinkPlugin from "./lexical-plugin/LexicalAutoLinkPlugin";
import ClickableLinkPlugin from "./lexical-plugin/ClickableLinkPlugin";

interface EditorConfig {
    namespace: string;
    theme: any;
    onError: (error: Error) => void;
    nodes: any[];
    editorState?: any;
}

interface EditorBaseProps {
    initialConfig: EditorConfig;
    children: React.ReactNode;
}

const EditorBase = ({ initialConfig, children }: EditorBaseProps) => {
    return (
        <div className="flex justify-center p-5">
            <div className="w-full max-w-3xl bg-white p-5 border rounded ">
                <LexicalComposer initialConfig={initialConfig}>
                    <div className="bg-white rounded p-4 mb-5 min-h-[300px]">
                        <RichTextPlugin
                            contentEditable={<ContentEditable className="min-h-[150px] bg-transparent border-none outline-none w-full" />}
                            placeholder={<div className="absolute text-gray-400 top-6 left-3 pointer-events-none select-none">Enter some text...</div>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <OnChangePlugin onChange={(editorState) => console.log(editorState)} />
                        <AutoFocusPlugin />
                        <HistoryPlugin />
                        <MarkdownPlugin />
                        <TabIndentationPlugin />
                        <LexicalAutoLinkPlugin />
                        <ClickableLinkPlugin />
                    </div>
                    {children}
                </LexicalComposer>
            </div>
        </div>
    );
};

export default EditorBase;
