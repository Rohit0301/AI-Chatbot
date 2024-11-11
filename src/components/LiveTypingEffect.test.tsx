import { render, screen } from "@testing-library/react";

import LiveTypingEffect from "./LiveTypingEffect";
import { act } from "react";

describe("LiveTypingEffect Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("displays characters one at a time based on typing speed", async () => {
    render(<LiveTypingEffect message="Hello" typingSpeed={100} />);

    expect(screen.queryByText("H")).not.toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText("H")).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText("He")).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByText("Hell")).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("calls onComplete callback after typing the entire message", async () => {
    const onCompleteMock = jest.fn();
    render(
      <LiveTypingEffect
        message="H"
        typingSpeed={100}
        onComplete={onCompleteMock}
      />
    );
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText("H")).toBeInTheDocument();
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it("clears interval on unmount to avoid memory leaks", () => {
    const { unmount } = render(
      <LiveTypingEffect message="Hello" typingSpeed={100} />
    );
    unmount();
    expect(() => jest.advanceTimersByTime(100)).not.toThrow();
  });
});
