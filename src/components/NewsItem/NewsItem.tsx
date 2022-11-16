import { useEffect, useState } from "react";
import { getNewsInfo } from "../../api/service";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNewsListActions } from "../../hooks/useActions";
import { convertTime } from "../../utils/time";
import "./NewsItem.scss";

type NewsItemType = {
  id: number;
};

const NewsItem = ({ id }: NewsItemType) => {
  const navigate = useNavigate();
  const newsItem = useTypedSelector((state) =>
    state.newsList.newsItemsInfo.find((item: any) => item?.id === id)
  );
  const { addNewsItem } = useNewsListActions();
  const [newsInfo, setNewsInfo] = useState(newsItem);

  useEffect(() => {
    if (!newsItem) {
      fetchNewsInfo();
    }
  }, []);

  const fetchNewsInfo = async () => {
    await getNewsInfo(id).then((data) => {
      addNewsItem(data);
      setNewsInfo(data);
    });
  };

  return !newsInfo ? (
    <div></div>
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
