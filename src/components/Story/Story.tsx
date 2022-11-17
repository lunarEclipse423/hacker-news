import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useStoriesActions } from "../../hooks/useActions";
import { getStoryInfo } from "../../api/service";
import { getFullCurrentDate } from "../../utils/getDate";
import { IStory } from "../../types/story";
import "./Story.scss";

type StoryType = {
  id: number;
};

const Story = ({ id }: StoryType) => {
  const navigate = useNavigate();
  const { addStory } = useStoriesActions();
  const story = useTypedSelector((state) => {
    if (state.stories.storiesInfo.length !== 0) {
      return state.stories.storiesInfo.find((story: IStory) => story.id === id);
    }
    return undefined;
  });
  const [storyInfo, setStoryInfo] = useState<IStory | undefined>(story);

  useEffect(() => {
    if (!story) {
      fetchStoryInfo();
    }
  }, []);

  const fetchStoryInfo = async (): Promise<void> => {
    await getStoryInfo(id).then((fetchedInfo: IStory) => {
      addStory(fetchedInfo);
      setStoryInfo(fetchedInfo);
    });
  };

  return !storyInfo ? (
    <></>
  ) : (
    <div
      className="story"
      onClick={() => navigate(`/home/${id}`, { state: { storyInfo: storyInfo } })}
    >
      <div>
        <h3 className="story-title">{storyInfo.title}</h3>
        <div className="story-info story__story-info">
          <span className="story-author">by {storyInfo.by} |&nbsp;</span>
          <span className="story-date">{`${getFullCurrentDate(storyInfo.time)}`} | </span>
          <span className="points-icon story__points-icon"></span>
          <span className="story-rating">{`${storyInfo.score} ${
            storyInfo.score === 1 ? "point" : "points"
          }`}</span>
        </div>
      </div>
    </div>
  );
};

export default Story;
