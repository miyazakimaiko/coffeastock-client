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
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="w-full p-4 bg-white shadow-sm rounded-md"
      >
        <h3 className="font-normal text-md opacity-60 mb-4">
          RSS Coffee Feed
        </h3>
        <div className="items-center max-h-600px overflow-auto">
          
          {sortByPublishDate(feed).map(article => {

            const thumbnail = new DOMParser().parseFromString(article.content, 'text/html').body.getElementsByTagName('img')[0]?.src;
            
            return (
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
                {thumbnail && 
                  <div>
                    <img src={thumbnail} alt="" className="h-40 w-full object-cover rounded-md mb-2"/>
                  </div>
                }
                <div>
                  <span className="font-medium text-xs opacity-50 mr-2">{article.csName} -</span>
                  <span className="font-medium text-xs opacity-50">{article.pubDate ? new Date(article.pubDate).toDateString() : null}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RssFeed
