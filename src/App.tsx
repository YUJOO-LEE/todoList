import React, { useState } from 'react';
import './App.css';
import { handleCallAPI } from './util/fetcher';

function App() {
  const [fetchResult, setFetchResult] = useState<string[]>([]);

  return (
      <>
        <button
            className="button-with-margin"
            onClick={handleCallAPI('post', fetchResult, setFetchResult)}
        >
          post test
        </button>
        <button
            className="button-with-margin"
            onClick={handleCallAPI('get', fetchResult, setFetchResult)}
        >
          get test
        </button>
        <button
            className="button-with-margin"
            onClick={handleCallAPI('put', fetchResult, setFetchResult)}
        >
          put test
        </button>
        <button
            className="button-with-margin"
            onClick={handleCallAPI('delete', fetchResult, setFetchResult)}
        >
          delete test
        </button>
        <button
            className="button-with-margin clear"
            onClick={() => setFetchResult([])}
        >
          Clear!
        </button>
        <br />
        <br />
        {fetchResult?.length > 0 && (
          <ul className="fetch-result">
            {[...fetchResult].reverse().map((v, i) => <li key={`${v}-${i}`}>{v}</li>)}
          </ul>
        )}
      </>
  );
}

export default App;
