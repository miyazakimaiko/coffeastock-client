import React, { useEffect, useState } from 'react'
import Spinner from '../../elements/Spinner';

const RssFeed = () => {

  const BhRssData = {
    feed: "https://api.rss2json.com/v1/api.json?rss_url=https://www.baristahustle.com/feed",
    name: "baristahustle.com"
  }

  const stdmRssData = {
    feed: "https://api.rss2json.com/v1/api.json?rss_url=https://standartmag.com/blogs/journal.atom",
    name: "standartmag.com"
  }

  const MAX_ARTICLES = 5;

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async (md) => {
      fetch(md.feed, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => data.items.filter((item) => item.title.length > 0))
        .then((newArticles) => newArticles.slice(0, MAX_ARTICLES))
        .then((newArticles) => newArticles.map(article => ({...article, csName: md.name})))
        .then((articles) => setArticles(arr => [...arr, ...articles]))
        .catch((error) => console.log(error));
    };

    loadArticles(BhRssData);
    loadArticles(stdmRssData);
    setIsLoading(false);
  }, []);


  function sortByPublishDate(articles) {
    return articles.sort((a, b) => (a.pubDate < b.pubDate) ? 1 : -1)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="w-full p-4 bg-white shadow-sm rounded-md"
      >
        <h3 className="font-normal text-md opacity-60 mb-4">
          RSS Coffee Feed
        </h3>
        <div className="items-center max-h-600px overflow-auto">
          {sortByPublishDate(articles).map(article => (
            <article className="flex flex-col p-4 border mb-2 rounded-md">
              <a 
                href={article.link} 
                className="text-base font-medium mb-2 hover:opacity-70"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={article.link}
                key={article.link}
              >
                {article.title}
              </a>
              {article.thumbnail && 
                <div>
                  <img src={article.thumbnail} alt="" className="h-40 w-full object-cover rounded-md mb-2"/>
                </div>
              }
              <div>
                <span className="font-medium text-xs opacity-50 mr-2">{article.csName} -</span>
                <span className="font-medium text-xs opacity-50">{article.pubDate ? new Date(article.pubDate).toDateString() : null}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RssFeed
