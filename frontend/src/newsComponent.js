import React, { useEffect, useState } from 'react';
import './newComponent.css'

function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/rss')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        if (!data.items) {
          throw new Error('Items array is missing');
        }
        setArticles(data.items); 
      })
      .catch(error => console.error("Could not fetch data:", error));
  }, []);
  
  console.log('Rendering articles:', articles);
  

  return (
    <div>
      <h1>News Feed</h1>
      <ul>
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <h2>{article.title}</h2>
              <p>{article.contentSnippet}</p>
              <p>By: {article.creator || article["dc:creator"]}</p>
              <p>Published on: {new Date(article.isoDate).toLocaleDateString()}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </li>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </ul>
    </div>
  );
  
}

export default NewsFeed;
