import React from 'react';
import {
    FORMAT_TEXT_COMMAND,
    TextFormatType,
} from "lexical";
import { useCallback } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TbBold, TbItalic, TbUnderline } from "react-icons/tb";

const formatToIcon = {
    bold: <TbBold />,
    italic: <TbItalic />,
    underline: <TbUnderline />,
};

const InlineToolbarPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    const formatText = useCallback(
        (format: TextFormatType) => {
            editor.update(() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
            });
        },
        [editor]
    );

    return (
        <div>
            {Object.entries(formatToIcon).map(([format, Icon]) => (
                <button
                    key={format}
                    type="button"
                    onClick={() => formatText(format as TextFormatType)}
                >
                    {Icon}
                </button>
            ))}
        </div>
    );
};


export default InlineToolbarPlugin;
