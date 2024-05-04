import { Klass, LexicalNode } from "lexical";
import { HeadingNode, QuoteNode, } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";

export const nodes: Klass<LexicalNode>[] = [
    HeadingNode, 
    ListNode, 
    ListItemNode, 
    LinkNode, 
    AutoLinkNode,
    QuoteNode, 
    CodeNode,
];