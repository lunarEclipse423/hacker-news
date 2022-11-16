import { useEffect, useState } from "react";
import NewsItem from "../../components/NewsItem/NewsItem";
import { useNewsListActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getNewsIds } from "../../api/service";
import { getDate } from "../../utils/time";
import "./HomePage.scss";

const HomePage = () => {
  const apiCallsInterval = 60000;
  const { updateNewsList } = useNewsListActions();
  const newsList = useTypedSelector((state) => state.newsList);
  const [newsIds, setNewsIds] = useState([]);
  const [isNewsListLoading, setIsNewsListLoading] = useState(false);

  useEffect(() => {
    console.log("use effect 1");
    fetchNews();
    const interval = setInterval(() => {
      console.log("use effect 2");
      fetchNews();
    }, apiCallsInterval);
    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    setIsNewsListLoading(true);
    getNewsIds()
      .then((data) => {
        updateNewsList(data);
        setNewsIds((prevState: any) => {
          prevState = Object.assign([], data);
          return prevState;
        });
      })
      .finally(() => setIsNewsListLoading(false));
  };

  return (
    <div className="news-feed">
      <h1 className="home-title">Hacker News</h1>
      <div className="tools">
        <div className="current-date-text">
          <p className="trending-text">Trending</p>
          <p className="current-date sub-text__date">{getDate()}</p>
        </div>
        <span className="refresh-icon" onClick={fetchNews}></span>
      </div>
      <div className="news-items-wrapper">
        {isNewsListLoading ? (
          <h2 className="loading-news-title">Loading news...</h2>
        ) : (
          newsIds.map((id: number) => {
            return <NewsItem id={id} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
