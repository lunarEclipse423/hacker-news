import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getNewsInfo } from "../../api/service";
import { convertTime } from "../../utils/time";
import { IStory } from "../../types/story";
import CommentItem from "../../components/CommentItem/CommentItem";
import "./NewsPage.scss";
import { formatText } from "../../utils/formatText";

const NewsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newsInfo, setNewsInfo] = useState<IStory>(location.state.newsInfo);
  const [isNewsInfoLoading, setIsNewsInfoLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateNewsInfo = async (): Promise<void> => {
    setIsNewsInfoLoading(true);
    getNewsInfo(newsInfo.id)
      .then((data: IStory) => {
        setNewsInfo((prevState: IStory) => {
          prevState = Object.assign([], data);
          return prevState;
        });
      })
      .finally(() => setIsNewsInfoLoading(false));
  };

  return (
    <div className="news-page">
      <div className="back" onClick={() => navigate("/home")}>
        <span className="back-icon"></span>
      </div>
      <div className="news-content">
        <div className="news-score-wrapper">
          <span className="news-score-icon"></span>
          <span className="news-score">{`${newsInfo.score}`}</span>
        </div>

        <div className="news-text-wrapper">
          <h1 className="news-title">{newsInfo.title}</h1>
          <div className="news-info">
            <span className="news-link-text">
              {newsInfo.url ? (
                <>
                  Link:{" "}
                  <a href={`${newsInfo.url}`} className="news-link" target="_blank">
                    {`${newsInfo.url}`}
                  </a>
                </>
              ) : newsInfo.text ? (
                <>
                  <p>{formatText(newsInfo.text)}</p>
                  <p className="link-text">Link: link is not provided</p>
                </>
              ) : (
                <>No link or text was provided</>
              )}
            </span>
            <div className="news-author-and-date">
              <span className="news-author">by {newsInfo.by} | </span>
              <span className="news-date">{`${convertTime(newsInfo.time)}`} | </span>
              <div className="comments-count-wrapper">
                <span className="comment-icon comment-count__icon"></span>
                <span className="comments-count">{`${newsInfo.descendants} ${
                  newsInfo.descendants !== 1 ? "comments" : "comment"
                }`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="comments-section news-page__comments-section">
        <div className="comments-tools comments-section__tools">
          <p className="comments-title">Comments</p>
          <span className="refresh-icon" onClick={updateNewsInfo}></span>
        </div>
        <div className="comments-items-wrapper">
          {isNewsInfoLoading ? (
            <h2 className="loading-comments-title">Loading comments...</h2>
          ) : newsInfo.descendants === 0 ? (
            <p className="no-comments-text">No comments yet</p>
          ) : (
            newsInfo
              .kids!.sort((a: number, b: number) => b - a)
              .map((id: number) => {
                return <CommentItem id={id} />;
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
