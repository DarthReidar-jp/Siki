import React, { useState, useEffect } from 'react';

interface Book {
  title: string;
  contentHtml: string;
}

const Reader: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reader/book:id'); // 適切なURLに変更してください
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book:', error);
      }
    };

    fetchBook();
  }, []);

  return (
    <div className="row">
      <div className="col-8 main-content">
        <div className="book">
          <div className="book-body">
            {book && (
              <>
                <h2 className="title">{book.title}</h2>
                <div className="content" dangerouslySetInnerHTML={{ __html: book.contentHtml }} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="col-3 mode-content">
        <div className="card">
          <div className="card-body">
            <button id="showMemoBtn">メモを表示</button>
            <button id="showIndexBtn">目次を表示</button>
            <button id="showDictionaryBtn">辞書を表示</button>
            <div className="mode-div" id="memoMode" style={{ display: 'none' }}>
              {/* メモモードのコンテンツ */}
            </div>
            <div className="mode-div" id="indexMode" style={{ display: 'none' }}>
              {/* 目次モードのコンテンツ */}
              <p>目次モードの内容</p>
            </div>
            <div className="mode-div" id="dictionaryMode" style={{ display: 'none' }}>
              {/* 辞書モードのコンテンツ */}
              <p>辞書モードの内容</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
