import { useContext, useState } from "react";
import { BgContext } from "./page";
import { BgImage } from "./customClasses";

function BgSort() {
  const bgContext = useContext(BgContext);

  enum SortBy {
    Name,
    Size,
    Modified,
    None,
  }

  const [ascOrder, setAscOrder] = useState(true);
  const [sortBy, setSortBy] = useState(SortBy.None);

  function sortImages(sortParameter: SortBy) {
    const indexedImageArray: {
      imageData: BgImage;
      prevIndex: number;
    }[] = bgContext.values.bgImages.map((image, index) => {
      return { imageData: image, prevIndex: index };
    });
    console.log(indexedImageArray);

    if (sortParameter === sortBy) {
      setAscOrder(!ascOrder);
    } else {
      setSortBy(sortParameter);

      switch (sortParameter) {
        case SortBy.Name:
          indexedImageArray.sort(
            (a: any, b: any) => a.imageData.name - b.imageData.name
          );
          break;
        case SortBy.Size:
          indexedImageArray.sort(
            (a: any, b: any) => a.imageData.size - b.imageData.size
          );
          break;
        case SortBy.Modified:
          indexedImageArray.sort(
            (a: any, b: any) => a.imageData.modified - b.imageData.modified
          );
          break;
        default:
          throw "Wrong sort type (that shouldn't happen)!";
      }
    }

    if (!ascOrder) {
      indexedImageArray.reverse();
    }

    const newImageIndex = indexedImageArray.findIndex(
      (indexedImage) => indexedImage.prevIndex === bgContext.values.imageIndex
    );

    const sortedBgArray: BgImage[] = indexedImageArray.map(
      (image) => image.imageData
    );
    console.log(sortedBgArray);

    console.log(newImageIndex, bgContext.values.imageIndex);

    bgContext.setValues({
      ...bgContext.values,
      bgImages: sortedBgArray,
      imageIndex: newImageIndex,
    });
  }

  function getSortIcon(sortParameter: SortBy): string {
    if (sortParameter === sortBy) {
      return ascOrder ? "↑" : "↓";
    } else {
      return "";
    }
  }
  return (
    <div className="flex flex-col items-start justify-between">
      <button
        type="button"
        className="font-bold"
        onClick={() => sortImages(SortBy.Name)}
      >
        name {getSortIcon(SortBy.Name)}
      </button>
      <button
        type="button"
        className="font-bold"
        onClick={() => sortImages(SortBy.Size)}
      >
        size {getSortIcon(SortBy.Size)}
      </button>
      <button
        type="button"
        className="font-bold"
        onClick={() => sortImages(SortBy.Modified)}
      >
        modified {getSortIcon(SortBy.Modified)}
      </button>
    </div>
  );
}

export default BgSort;

//font-bold bg-sky-300 p-1 border-cyan-700 border-solid border-4 rounded-lg