// node.ts の更新
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list"; // @lexical/list からインポート
import { LinkNode } from "@lexical/link"; // @lexical/link からインポート
import { Klass, LexicalNode } from "lexical";

export const nodes: Klass<LexicalNode>[] = [HeadingNode, ListNode, ListItemNode, LinkNode];
