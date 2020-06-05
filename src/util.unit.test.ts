import * as Util from "./util";

describe("capitalize", () => {
  it("capitalizes first letters", () => {
    expect(Util.capitalize("this is a test")).toBe("This Is A Test");
  });
});

describe("randomElement", () => {
  it("returns undefined on empty array", () => {
    const arr: number[] = [];
    expect(Util.randomElement(arr)).toBe(undefined);
  });
  it("picks a valid element", () => {
    const arr: number[] = [1];
    expect(Util.randomElement(arr)).toBe(1);
  });
});

describe("stripSpeak", () => {
  it("removes <speak> and </speak> tags", () => {
    expect(Util.stripSpeak("<speak>this is a test</speak>")).toBe(
      "this is a test"
    );
  });
});

describe("getSlotValues", () => {
  //Todo: Add Tests
});

describe("sayArray", () => {
  //Todo: Add Tests
});

describe("supportsDisplay", () => {
  //Todo: Add Tests
});

describe("getCustomIntents", () => {
  //Todo: Add Tests
});

describe("getSampleUtterance", () => {
  //Todo: Add Tests
});

describe("getPreviousIntent", () => {
  //Todo: Add Tests
});

describe("getPreviousSpeechOutput", () => {
  //Todo: Add Tests
});

describe("shuffleArray", () => {
  //Todo: Add Tests
});
