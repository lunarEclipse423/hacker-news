import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoryInfo } from "../../api/service";
import { getFullCurrentDate } from "../../utils/getDate";
import { formatText } from "../../utils/formatText";
import { IStory } from "../../types/story";
import Comment from "../../components/Comment/Comment";
import "./StoryPage.scss";

const StoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [storyInfo, setStoryInfo] = useState<IStory>(location.state.storyInfo);
  const [isStoryInfoLoading, setIsStoryInfoLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateStoryInfo = async (): Promise<void> => {
    setIsStoryInfoLoading(true);
    getStoryInfo(storyInfo.id)
      .then((fetchedInfo: IStory) => {
        setStoryInfo((prevState: IStory) => {
          prevState = Object.assign([], fetchedInfo);
          return prevState;
        });
      })
      .finally(() => setIsStoryInfoLoading(false));
  };

  return (
    <div className="story-page">
      <div className="back" onClick={() => navigate("/home")}>
        <span className="back-icon"></span>
      </div>
      <div className="story-content">
        <div className="story-score-wrapper">
          <span className="story-score-icon"></span>
          <span className="story-score">{`${storyInfo.score}`}</span>
        </div>

        <div className="story-text-wrapper">
          <h1 className="story-page-title">{storyInfo.title}</h1>
          <div className="story-page-info">
            <span className="story-link-text">
              {storyInfo.url ? (
                <>
                  Link:{" "}
                  <a href={`${storyInfo.url}`} target="_blank">
                    {`${storyInfo.url}`}
                  </a>
                </>
              ) : storyInfo.text ? (
                <>
                  <p>{formatText(storyInfo.text)}</p>
                  <p className="link-text">Link: link is not provided</p>
                </>
              ) : (
                <>No link or text was provided</>
              )}
            </span>
            <div className="story-page-author-and-date">
              <span className="story-page-author">by {storyInfo.by} | </span>
              <span className="story-page-date">
                {`${getFullCurrentDate(storyInfo.time)}`} |{" "}
              </span>
              <div className="comments-count-wrapper">
                <span className="comment-icon comment-count__icon"></span>
                <span className="comments-count">{`${storyInfo.descendants} ${
                  storyInfo.descendants !== 1 ? "comments" : "comment"
                }`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="comments-section story-page__comments-section">
        <div className="comments-tools comments-section__tools">
          <p className="comments-title">Comments</p>
          <span className="refresh-icon" onClick={updateStoryInfo}></span>
        </div>
        <div className="comments-items-wrapper">
          {isStoryInfoLoading ? (
            <h2 className="loading-comments-title">Loading comments...</h2>
          ) : storyInfo.descendants === 0 ? (
            <p className="no-comments-text">No comments yet</p>
          ) : (
            storyInfo
              .kids!.sort((a: number, b: number) => b - a)
              .map((id: number) => {
                return <Comment key={id} id={id} />;
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
