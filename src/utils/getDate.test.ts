import { getFullCurrentDate, getShortCurrentDate, getCommentDate } from "./getDate";

describe("getFullCurrentDate function", () => {
  test("Should return correct full date for 0", () => {
    expect(getFullCurrentDate(0)).toEqual("January 1, 1970, 12:00:00 AM");
  });
  test("Should return correct full current date", () => {
    // given
    const inputData = 1668725604;
    const expectedResult = "November 17, 2022, 10:53:24 PM";
    // then
    expect(getFullCurrentDate(inputData)).toEqual(expectedResult);
  });
});

describe("getShortCurrentDate function", () => {
  test("Should return correct short current date", () => {
    // given
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    // then
    expect(getShortCurrentDate()).toEqual(
      new Date().toLocaleDateString("en-US", options)
    );
  });
});

describe("getCommentDate function", () => {
  test("Should return correct comment date for 0", () => {
    expect(getCommentDate(0)).toEqual("January 1, 12:00:00 AM");
  });
  test("Should return correct date", () => {
    // given
    const inputData = 1668725604;
    const expectedResult = "November 17, 10:53:24 PM";
    // then
    expect(getCommentDate(inputData)).toEqual(expectedResult);
  });
});
