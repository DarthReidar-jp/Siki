// dataFetchUtils.ts
import { getDBCollection } from './dbUtils';
import { Folder } from '../models/folder'; // Folderクラスのインポート
import { Page } from '../models/page'; // Memoクラスのインポート
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

export async function getAllPages(): Promise<{ pages: Page[] }> {
  try {
    const pagesCollection = await getDBCollection('pages');
    const pages: Page[] = await pagesCollection.find({}).toArray();
    return { pages };
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


export async function getAllFoldersAndPages(): Promise<{ folders: Folder[], pages: Page[] }> {
  try {
    const foldersCollection = await getDBCollection('folders');
    const folders: Folder[] = await foldersCollection.find({}).toArray();
    const pagesCollection = await getDBCollection('pages');
    const pages: Page[] = await pagesCollection.find({}).toArray();
    return { folders , pages };
  } catch (e) {
    // エラーがErrorインスタンスかどうかをチェック
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}
