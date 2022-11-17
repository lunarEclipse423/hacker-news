import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNewsListActions } from "../../hooks/useActions";
import { getNewsInfo } from "../../api/service";
import { convertTime } from "../../utils/time";
import { IStory } from "../../types/story";
import "./NewsItem.scss";

type NewsItemType = {
  id: number;
};

const NewsItem = ({ id }: NewsItemType) => {
  const navigate = useNavigate();
  const { addStory } = useNewsListActions();
  const newsItem = useTypedSelector((state) => {
    if (state.stories.storiesInfo.length !== 0) {
      return state.stories.storiesInfo.find((item: IStory) => item.id === id);
    }
    return undefined;
  });
  const [newsInfo, setNewsInfo] = useState<IStory | undefined>(newsItem);

  useEffect(() => {
    if (!newsItem) {
      fetchNewsInfo();
    }
  }, []);

  const fetchNewsInfo = async (): Promise<void> => {
    await getNewsInfo(id).then((data: IStory) => {
      addStory(data);
      setNewsInfo(data);
    });
  };

  return !newsInfo ? (
    <></>
  ) : (
    <div
      className="news-item"
      onClick={() => navigate(`/home/${id}`, { state: { newsInfo } })}
    >
      <div className="item-text">
        <h3 className="item-title">{newsInfo.title}</h3>
        <div className="item-info item-text__info">
          <span className="item-author">by {newsInfo.by} |&nbsp;</span>
          <span className="item-date">{`${convertTime(newsInfo.time)}`} | </span>
          <span className="points-icon news-item__icon"></span>
          <span className="item-rating">{`${newsInfo.score} ${
            newsInfo.score === 1 ? "point" : "points"
          }`}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
