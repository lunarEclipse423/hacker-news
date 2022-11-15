import { useEffect, useState } from "react";
import { getNewsInfo } from "../../api/service";
// import { useNavigate } from "react-router-dom";
import { getHoursPassed, convertTime } from "../../utils/time";
import "./NewsItem.scss";

const NewsItem = ({ id }: any) => {
  const [newsInfo, setNewsInfo] = useState<any>({});
  //   const navigate = useNavigate();
  useEffect(() => {
    getNewsInfo(id).then((data) => setNewsInfo(data));
  }, []);

  return (
    <div
      className="news-item"
      //   onClick={() => navigate(`/home/${item.id}`, { state: { item } })}
    >
      <div className="item-text">
        <h3 className="item-title">{newsInfo.title}</h3>
        <div className="item-info item-text__info">
          <div className="left-part">
            <span className="item-author">by {newsInfo.by} | </span>
            <span className="item-date item-info__pos">
              {`${convertTime(newsInfo.time)}`}
            </span>
          </div>
          <div className="right-part">
            <span className="item-rating item-info__pos">{`rating: ${newsInfo.score}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
