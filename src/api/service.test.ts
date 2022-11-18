import { getStoriesIds, getStoryInfo, getCommentInfo } from "./service";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API functions", () => {
  test("Should get response for stories ids", async () => {
    // given
    const fakeStoriesIds = [987278001, 987278003, 987278002];
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fakeStoriesIds })
    );
    // when
    const storiesIds = await getStoriesIds();

    // then
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(storiesIds).toEqual(fakeStoriesIds);
  });

  test("Should get response for story info", async () => {
    // given
    const fakeStoryInfo = {
      by: "someguy",
      descendants: 0,
      id: 123456,
      score: 55,
      time: 1668725604,
      title: "Title Title",
      type: "story",
      url: "someurl",
    };
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fakeStoryInfo })
    );

    // when
    const storyInfo = await getStoryInfo(123456);

    // then
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(storyInfo).toEqual(fakeStoryInfo);
  });

  test("Should get response for comment info", async () => {
    // given
    const fakeCommentInfo = {
      by: "someone",
      id: 123456,
      parent: 7891011,
      text: "Seriously? Omg",
      time: 1668725604,
      type: "comment",
    };
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fakeCommentInfo })
    );

    // when
    const commentInfo = await getCommentInfo(123456);

    // then
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(commentInfo).toEqual(fakeCommentInfo);
  });

  test("Invalid get response for stories ids", async () => {
    // given
    const errorMessage = "Error in getStoriesIds";
    mockedAxios.get.mockRejectedValue(errorMessage);
    // then
    try {
      await getStoriesIds();
    } catch (error) {
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(error).toEqual(errorMessage);
    }
  });

  test("Invalid get response for story info", async () => {
    // given
    const errorMessage = "Error in getStoryInfo";
    mockedAxios.get.mockRejectedValue(errorMessage);
    // then
    try {
      await getStoryInfo(12);
    } catch (error) {
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(error).toEqual(errorMessage);
    }
  });

  test("Invalid get response for comment info", async () => {
    // given
    const errorMessage = "Error in getCommentInfo";
    mockedAxios.get.mockRejectedValue(errorMessage);
    // then
    try {
      await getCommentInfo(12);
    } catch (error) {
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(error).toEqual(errorMessage);
    }
  });
});
