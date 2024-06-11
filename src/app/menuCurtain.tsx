import { useEffect, useRef, useState } from "react";
import TextLoadBtn from "./btnLoadText";
import BgLoadBtn from "./btnLoadBg";
import BgSelect from "./optionBgSelect";
import ShowStart from "./optionShowStart";
import RandomShowOption from "./optionShowRandom";
import BgSort from "./optionBgSort";
import IntervalShowOption from "./optionShowInterval";

function MenuCurtain() {
  const EXPANDED_WIDTH: number = 100;
  const SWIPE_WIDTH: number = 20;
  const HINT_WIDTH: number = 15;
  const COLLAPSED_WIDTH: number = 0;

  const [curtainWidth, setCurtainWidth] = useState(COLLAPSED_WIDTH);
  const curtainWidthRef = useRef(curtainWidth);
  curtainWidthRef.current = curtainWidth;

  useEffect(() => {
    let touchStart: number | null = null;
    let touchEnd: number | null = null;
    let touchStartWidth: number = curtainWidthRef.current;

    function getTouchDistance(): number {
      return touchStart && touchEnd ? touchStart - touchEnd : 0;
    }

    function getScreenPercentSize(percent: number): number {
      return (window.innerWidth * percent) / 100;
    }

    function handleTouchStart(e: TouchEvent): void {
      touchEnd = null;
      touchStartWidth = curtainWidthRef.current;

      const isPressedNearTheEdge =
        getScreenPercentSize(curtainWidthRef.current - HINT_WIDTH) <
          e.touches[0].clientX &&
        e.touches[0].clientX <
          getScreenPercentSize(curtainWidthRef.current + HINT_WIDTH);

      if (isPressedNearTheEdge) {
        touchStart = e.touches[0].clientX;
      }
    }

    function handleTouchMove(e: TouchEvent): void {
      touchEnd = e.touches[0].clientX;
      setCurtainWidth(
        touchStartWidth - (100 * getTouchDistance()) / window.innerWidth
      );
    }

    function handleTouchEnd(): void {
      const isLeftSwipe =
        getTouchDistance() > getScreenPercentSize(SWIPE_WIDTH);
      const isRightSwipe =
        getTouchDistance() < -getScreenPercentSize(SWIPE_WIDTH);

      if (isRightSwipe) {
        setCurtainWidth(EXPANDED_WIDTH);
      } else if (isLeftSwipe) {
        setCurtainWidth(COLLAPSED_WIDTH);
      } else {
        setCurtainWidth(touchStartWidth);
      }

      touchStart = null;
    }

    function handleClick(e: MouseEvent): void {
      const isLeftSideTouch: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);
      if (isLeftSideTouch) {
        setCurtainWidth(EXPANDED_WIDTH);
        touchStartWidth = EXPANDED_WIDTH;
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      const isLeftSideHover: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);

      if (curtainWidthRef.current <= HINT_WIDTH) {
        setCurtainWidth(
          isLeftSideHover ? COLLAPSED_WIDTH + HINT_WIDTH : COLLAPSED_WIDTH
        );
      }
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="navCurtain"
      className="h-full w-0 fixed z-1 top-0 left-0  bg-black overflow-x-hidden duration-500"
      style={{
        width: `${curtainWidth}%`,
      }}
    >
      <div
        className="grid grid-cols-4 auto-rows-min gap-2 justify-stretch items-start relative text-left w-full h-full px-8 py-16 duration-500"
        style={{
          scale: curtainWidth > HINT_WIDTH ? curtainWidth / 100 : 0,
        }}
      >
        <label className="shrink-0 row-span-2">Select files for:</label>

        <label>text:</label>
        <div className="col-span-2">
          <TextLoadBtn />
        </div>

        <label>back&shy;ground:</label>
        <div className="col-span-2">
          <BgLoadBtn />
        </div>

        <hr className="col-span-4" />

        <label className="shrink-0 row-span-2">Back&shy;ground:</label>

        <label>sort by:</label>
        <div className="col-span-2 flex flex-row justify-between items-start">
          <BgSort />
        </div>

        <label>select:</label>
        <div className="col-span-2 h-[50vh]	row-span-auto">
          <BgSelect />
        </div>

        <hr className="col-span-4" />

        <label className="shrink-0 row-span-3">Slide&shy;show:</label>

        <label>inter&shy;val (s):</label>
        <div className="col-span-2">
          <IntervalShowOption />
        </div>

        <label>rando&shy;mize:</label>
        <div className="col-span-2">
          <RandomShowOption />
        </div>

        <label>launch:</label>
        <div className="col-span-2">
          <ShowStart onClick={() => setCurtainWidth(COLLAPSED_WIDTH)} />
        </div>
      </div>

      <button
        className="absolute top-2 right-8 text-6xl text-center z-5"
        onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}
      >
        &times;
      </button>
    </div>
  );
}

export default MenuCurtain;
