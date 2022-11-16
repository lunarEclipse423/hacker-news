import { useEffect, useState } from "react";
import { getNewsInfo } from "../../api/service";
import { useNavigate } from "react-router-dom";
import { convertTime } from "../../utils/time";
import "./NewsItem.scss";

const NewsItem = ({ id }: any) => {
  const [newsInfo, setNewsInfo] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    getNewsInfo(id).then((data) => setNewsInfo(data));
  }, []);

  return (
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
