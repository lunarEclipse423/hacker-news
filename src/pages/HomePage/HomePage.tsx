import { useEffect, useRef, useState } from "react";
import { useNewsListActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getNewsIds } from "../../api/service";
import { getDate } from "../../utils/time";
import NewsItem from "../../components/NewsItem/NewsItem";
import "./HomePage.scss";

const HomePage = () => {
  const apiCallsInterval = 60000;
  const { updateNewsList } = useNewsListActions();
  const newsList = useTypedSelector((state) => state.newsList.storiesIds);
  const [newsIds, setNewsIds] = useState<number[]>(newsList);
  const [isNewsListLoading, setIsNewsListLoading] = useState<boolean>(false);
  const intervalId = useRef(0);

  useEffect(() => {
    if (newsIds.length === 0) {
      fetchNews();
    }
    if (typeof window !== "undefined") {
      intervalId.current = window.setInterval(fetchNews, apiCallsInterval);
    }
    return () => clearInterval(intervalId.current);
  }, []);

  const fetchNews = async (): Promise<void> => {
    setIsNewsListLoading(true);
    await getNewsIds()
      .then((data: number[]) => {
        updateNewsList(data);
        setNewsIds((prevState: number[]) => {
          prevState = data;
          return prevState;
        });
      })
      .finally(() => setIsNewsListLoading(false));
  };

  const handleRefresh = (): void => {
    clearInterval(intervalId.current);
    if (typeof window !== "undefined") {
      intervalId.current = window.setInterval(fetchNews, apiCallsInterval);
    }
    fetchNews();
  };

  return (
    <div className="news-feed">
      <h1 className="home-title">Hacker News</h1>
      <div className="tools">
        <div className="current-date-text">
          <p className="trending-text">Trending</p>
          <p className="current-date sub-text__date">{getDate()}</p>
        </div>
        <span className="refresh-icon" onClick={handleRefresh}></span>
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
