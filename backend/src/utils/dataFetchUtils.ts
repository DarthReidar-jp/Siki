// dataFetchUtils.ts
import { getDBCollection } from './dbUtils';
import { Folder } from '../models/folder'; // Folderクラスのインポート
import { Memo } from '../models/memo'; // Memoクラスのインポート
import { Book } from '../models/book'; // Memoクラスのインポート

export async function getAllFolders(): Promise<{ folders: Folder[] }> {
  try {
    const foldersCollection = await getDBCollection('folders');
    const folders: Folder[] = await foldersCollection.find({}).toArray();
    return { folders };
  } catch (e) {
    // エラーがErrorインスタンスかどうかをチェック
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}

export async function getAllMemos(): Promise<{ memos: Memo[] }> {
  try {
    const memosCollection = await getDBCollection('memos');
    const memos: Memo[] = await memosCollection.find({}).toArray();
    return { memos };
  } catch (e) {
    // エラーがErrorインスタンスかどうかをチェック
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}

export async function getAllBooks(): Promise<{ books: Book[] }> {
  try {
    const booksCollection = await getDBCollection('books');
    const books: Book[] = await booksCollection.find({}).toArray();
    return { books };
  } catch (e) {
    // エラーがErrorインスタンスかどうかをチェック
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}


export async function getAllFoldersAndMemos(): Promise<{ folders: Folder[], memos: Memo[] }> {
  try {
    const foldersCollection = await getDBCollection('folders');
    const folders: Folder[] = await foldersCollection.find({}).toArray();
    const memosCollection = await getDBCollection('memos');
    const memos: Memo[] = await memosCollection.find({}).toArray();
    return { folders, memos };
  } catch (e) {
    // エラーがErrorインスタンスかどうかをチェック
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}
