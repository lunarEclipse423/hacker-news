import { useEffect, useRef, useState } from "react";
import { useStoriesActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getStoriesIds } from "../../api/service";
import { getShortCurrentDate } from "../../utils/getDate";
import Story from "../../components/Story/Story";
import "./HomePage.scss";

const HomePage = () => {
  const apiCallsInterval = 60000;
  const { updateStories } = useStoriesActions();
  const storageStoriesIds = useTypedSelector((state) => state.stories.storiesIds);
  const [storiesIds, setStoriesIds] = useState<number[]>(storageStoriesIds);
  const [areStoriesLoading, setAreStoriesLoading] = useState<boolean>(false);
  const intervalId = useRef(0);

  useEffect(() => {
    if (storiesIds.length === 0) {
      fetchStories();
    }
    if (typeof window !== "undefined") {
      intervalId.current = window.setInterval(fetchStories, apiCallsInterval);
    }
    return () => clearInterval(intervalId.current);
  }, []);

  const fetchStories = async (): Promise<void> => {
    setAreStoriesLoading(true);
    await getStoriesIds()
      .then((data: number[]) => {
        updateStories(data);
        setStoriesIds((prevState: number[]) => {
          prevState = data;
          return prevState;
        });
      })
      .finally(() => setAreStoriesLoading(false));
  };

  const handleRefresh = (): void => {
    clearInterval(intervalId.current);
    if (typeof window !== "undefined") {
      intervalId.current = window.setInterval(fetchStories, apiCallsInterval);
    }
    fetchStories();
  };

  return (
    <div className="feed">
      <h1 className="home-title">Hacker News</h1>
      <div className="tools">
        <div className="current-date-text">
          <p className="trending-text">Trending</p>
          <p className="current-date sub-text__date">{getShortCurrentDate()}</p>
        </div>
        <span className="refresh-icon" onClick={handleRefresh}></span>
      </div>
      <div className="stories-wrapper">
        {areStoriesLoading ? (
          <h2 className="loading-stories-title">Loading news...</h2>
        ) : (
          storiesIds.map((id: number) => {
            return <Story id={id} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
