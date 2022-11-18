import { formatText } from "./formatText";

describe("formatText function", () => {
  test("Should format empty text correctly", () => {
    expect(formatText("")).toEqual("");
  });
  test("Should format text correctly", () => {
    // given
    const inputText = "We&#x27;ve seen so many companies choose to delay";
    const expectedResult = "We've seen so many companies choose to delay";

    // then
    expect(formatText(inputText)).toEqual(expectedResult);
  });
});
