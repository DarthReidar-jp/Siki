import {HeadingNode,QuoteNode,} from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list"; 
import { Klass, LexicalNode } from "lexical";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";

export const nodes: Klass<LexicalNode>[] = [HeadingNode, ListNode, ListItemNode,LinkNode, QuoteNode,CodeNode];
