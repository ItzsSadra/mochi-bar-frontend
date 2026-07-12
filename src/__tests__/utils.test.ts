import { toPersianNumber, formatPrice, cn, slugify } from "@/lib/utils";

describe("toPersianNumber", () => {
  it("converts digits to Persian", () => {
    expect(toPersianNumber(123)).toBe("۱۲۳");
  });

  it("converts string digits", () => {
    expect(toPersianNumber("456")).toBe("۴۵۶");
  });

  it("handles zero", () => {
    expect(toPersianNumber(0)).toBe("۰");
  });

  it("handles mixed content", () => {
    expect(toPersianNumber("abc123xyz")).toBe("abc۱۲۳xyz");
  });

  it("handles large numbers", () => {
    expect(toPersianNumber(1000000)).toBe("۱۰۰۰۰۰۰");
  });
});

describe("formatPrice", () => {
  it("formats with تومان suffix", () => {
    const result = formatPrice(85000);
    expect(result).toContain("تومان");
  });

  it("formats small prices", () => {
    const result = formatPrice(1000);
    expect(result).toContain("تومان");
  });

  it("formats zero", () => {
    const result = formatPrice(0);
    expect(result).toContain("تومان");
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("hello@world!")).toBe("helloworld");
  });

  it("handles multiple spaces", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("trims leading/trailing dashes", () => {
    expect(slugify(" hello world ")).toBe("hello-world");
  });
});

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });
});
