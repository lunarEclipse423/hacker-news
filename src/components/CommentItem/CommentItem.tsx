import { useEffect, useState } from "react";
import { getCommentInfo } from "../../api/service";
import { formatText } from "../../utils/formatText";
import { getCommentDate } from "../../utils/time";
import "./CommentItem.scss";

const CommentItem = ({ id }: any) => {
  const [commentInfo, setCommentInfo] = useState<any>({});
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  useEffect(() => {
    getCommentInfo(id).then((data) => setCommentInfo(data));
  }, []);

  const handleClick = () => {
    setIsCommentClicked(true);
  };

  console.log("Comment Info");
  console.log(commentInfo);
  return (
    <div
      className={`comment-content ${
        commentInfo.kids && !isCommentClicked ? "comment-with-replies" : ""
      }`}
      onClick={handleClick}
    >
      <div className="comment-author-and-date">
        <span className="item-author">by {commentInfo.by} | </span>
        <span className="item-date item-info__pos">
          {`${getCommentDate(commentInfo.time)}`}
        </span>
      </div>
      <p className="comment-text">{formatText(commentInfo.text)}</p>
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
      {isCommentClicked && commentInfo.kids
        ? commentInfo.kids.map((id: number) => <CommentItem id={id} />)
        : ""}
    </div>
  );
};

export default CommentItem;
