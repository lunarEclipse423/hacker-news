import { useEffect, useState } from "react";
import { getCommentInfo } from "../../api/service";
import { formatText } from "../../utils/formatText";
import { getCommentDate } from "../../utils/getDate";
import { IComment } from "../../types/comment";
import "./Comment.scss";

const initialCommentInfoValue: IComment = {
  by: "",
  id: -1,
  parent: -1,
  text: "",
  time: -1,
  type: "",
};

type CommentType = {
  id: number;
};

const Comment = ({ id }: CommentType) => {
  const [commentInfo, setCommentInfo] = useState<IComment>(initialCommentInfoValue);
  const [isCommentClicked, setIsCommentClicked] = useState<boolean>(false);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsCommentLoading(true);
    getCommentInfo(id).then((data: IComment) => {
      setCommentInfo(data);
      setIsCommentLoading(false);
    });
  }, []);

  const handleClick = (): void => {
    setIsCommentClicked(true);
  };

  return commentInfo?.deleted ? (
    <></>
  ) : (
    <div
      className={`comment-content ${
        commentInfo.kids && !isCommentClicked ? "comment-with-replies" : ""
      }`}
      onClick={handleClick}
    >
      {isCommentLoading ? (
        <h2 className="comment-is-loading-title">Comment is loading...</h2>
      ) : (
        <>
          {commentInfo?.dead ? (
            <p className="dead-comment-text">
              <i>[this comment is dead]</i>
            </p>
          ) : (
            <>
              <div className="comment-author-and-date">
                <span className="author">by {commentInfo.by} | </span>
                <span className="date">{`${getCommentDate(commentInfo.time)}`}</span>
              </div>
              <p className="comment-text">{formatText(commentInfo.text)}</p>
            </>
          )}
          <div className="replies">
            <span className="replies-icon"></span>
            <span className="replies-count">{`${
              commentInfo.kids ? commentInfo.kids.length : 0
            } ${
              commentInfo.kids
                ? commentInfo.kids.length > 1
                  ? "replies"
                  : "reply"
                : "replies"
            }`}</span>
          </div>
          {isCommentClicked && commentInfo.kids ? (
            commentInfo.kids
              .sort((a: number, b: number) => b - a)
              .map((id: number) => <Comment key={id} id={id} />)
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
