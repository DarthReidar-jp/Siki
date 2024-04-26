import React from 'react';
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
} from "lexical";
import { useCallback, useState } from "react";
import { $setBlocksType } from "@lexical/selection";
import { HeadingTagType, $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    INSERT_CHECK_LIST_COMMAND,
} from "@lexical/list";
import { TbH1, TbH2, TbH3, TbQuote, TbList, TbListNumbers, TbCheckbox } from "react-icons/tb";
import { PiParagraph } from "react-icons/pi";
import LinkToolbarItem from "./LinkToolbarItem";

function ToolbarPlugin() {
    const SupportedBlockType = {
        paragraph: "Paragraph",
        h1: "Heading 1",
        h2: "Heading 2",
        h3: "Heading 3",
        h4: "Heading 4",
        h5: "Heading 5",
        h6: "Heading 6",
        quote: "Quate",
        number: "Numbered List",
        bullet: "Bullet List",
        check: "Check List",
    } as const;
    type BlockType = keyof typeof SupportedBlockType;

    const [blockType, setBlockType] = useState<BlockType>("paragraph");
    const [editor] = useLexicalComposerContext();

    const formatParagraph = useCallback(() => {
        if (blockType !== "paragraph") {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createParagraphNode());
                }
            });
            setBlockType("paragraph");
        }
    }, [blockType, editor]);

    const formatQuote = useCallback(() => {
        if (blockType !== "quote") {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createQuoteNode());
                }
            });
            setBlockType("quote");
        }
    }, [blockType, editor]);

    const formatBulletList = useCallback(() => {
        if (blockType !== "bullet") {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                }
            });
            setBlockType("bullet");
        }
    }, [blockType, editor]);

    const formatNumberList = useCallback(() => {
        if (blockType !== "number") {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                }
            });
            setBlockType("number");
        }
    }, [blockType, editor]);

    const formatCheckList = useCallback(() => {
        if (blockType !== "check") {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
                }
            });
            setBlockType("check");
        }
    }, [blockType, editor]);

    const formatHeading = useCallback(
        (type: HeadingTagType) => {
            if (blockType !== type) {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        $setBlocksType(selection, () => $createHeadingNode(type));
                    }
                });
                setBlockType(type);
            }
        },
        [blockType, editor]
    );

    return (
        <div>
            <button type="button" onClick={() => formatHeading("h1")}>
                <TbH1 />
            </button>
            <button type="button" onClick={() => formatHeading("h2")}>
                <TbH2 />
            </button>
            <button type="button" onClick={() => formatHeading("h3")}>
                <TbH3 />
            </button>
            <button type="button" onClick={() => formatParagraph()}>
                <PiParagraph />
            </button>
            <button type="button" onClick={() => formatQuote()}>
                <TbQuote />
            </button>
            <button type="button" onClick={() => formatBulletList()}>
                <TbList />
            </button>
            <button type="button" onClick={() => formatNumberList()}>
                <TbListNumbers />
            </button>
            <button type="button" onClick={() => formatCheckList()}>
                <TbCheckbox />
            </button>
            <LinkToolbarItem />
        </div>
    );
}


export default ToolbarPlugin;