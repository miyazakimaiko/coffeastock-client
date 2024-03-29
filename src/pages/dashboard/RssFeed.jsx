import React from 'react';
import Spinner from '../../elements/Spinner';
import useRssFeed from '../../hooks/useRssFeed';

const RssFeed = () => {

  const { 
    data: feed, 
    isLoading: feedIsLoading,
    isError: feedHasError,
  } = useRssFeed();

  function sortByPublishDate(articles) {
    return articles.sort((a, b) => (a.isoDate < b.isoDate) ? 1 : -1)
  }

  if (feedIsLoading) {
    return <Spinner />
  }

  if (feedHasError) {
    return "Cannot Find Contents.";
  }

  return (
    <div className="px-1 mb-4 md:mb-0">
      <div
        className="w-full p-4 bg-white shadow-sm rounded-md"
      >
        <h3 className="font-normal text-md opacity-60 mb-4">
          RSS Coffee Feed
        </h3>
        <div className="flex flex-col xl:flex-row items-center max-h-[400px] overflow-auto">
          
          {sortByPublishDate(feed).map(article => {
            
            return (
              <article className="w-full md:min-w-[380px] h-20 flex flex-col p-4 border mb-2 xl:mr-2 rounded-md">
                <a 
                  href={article.link} 
                  className="h-[60%] text-base font-medium mb-2 hover:opacity-70"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={article.link}
                  key={article.link}
                >
                  <div className="w-full truncate overflow-ellipsis">{article.title}</div>
                  <div>
                    <span className="font-medium text-xs opacity-50 mr-2">{article.csName} -</span>
                    <span className="font-medium text-xs opacity-50">{article.pubDate ? new Date(article.pubDate).toDateString() : null}</span>
                  </div>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RssFeed
