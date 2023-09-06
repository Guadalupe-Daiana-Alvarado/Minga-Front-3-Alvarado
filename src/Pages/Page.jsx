import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Page = () => {
  const { id, page } = useParams();
  console.log(id,page)
  const [counter, setCounter] = useState(0);
  const [chapter, setChapter] = useState({});

  const next = () => {
    if (counter + 1 < chapter.pages.length) {
      setCounter(counter + 1);
    } else {
      setCounter(0);
    }
  };

  const prev = () => {
    if (counter - 1 >= 0) {
      setCounter(counter - 1);
    } else {
      setCounter(chapter.pages.length - 1);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/chapters/${id}`)
      .then((res) => {
        setChapter(res.data.chapter);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <button onClick={prev}>Previous Page</button>
      <button onClick={next}>Next Page</button>
      {chapter?.pages.length > 0 ? (
        <div>
          <h2>Chapter Title: {chapter.title}</h2>
          <p>Page {counter + 1} of {chapter.pages.length}</p>
          <p>{chapter.pages[counter]}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
