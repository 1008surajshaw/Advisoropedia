import React, { useState,useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../components/postItem/PostItem";

const Home = (props) => {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const capitalise = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  useEffect(() => {
    document.title = `${capitalise(props.category)} - NewsGround`;
    updateNews();
    
  }, [])
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
  };
  
  return (
    <div>
      <h1  className="text-4xl text-yellow-200 mt-4 items-center text-center  py-3">GroundNews Top Headlines from {capitalise(props.category)}</h1>
      {loading && <div className="spinner">spinner</div>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading}
      >
        <div className="container mx-auto">
          <div className="  grid md:grid-cols-3 sm:grid-col-2 grid-cols-1 gap-4">
            {articles.map((element) => {
              return <div className="" key={element.url}>
                <PostItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>

            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
