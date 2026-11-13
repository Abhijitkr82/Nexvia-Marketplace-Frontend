
import { useState } from 'react';

// Tracks the visible image index of each product card.
export default function useImageCarousel() {
  const [imageIndexes, setImageIndexes] = useState({});

  const changeProductImage = (productId, direction, totalImages) => {
    if (
      !productId ||
      !Number.isInteger(totalImages) ||
      totalImages <= 1 ||
      ![-1, 1].includes(direction)
    ) {
      return;
    }

    setImageIndexes((previous) => {
      const currentIndex = previous[productId] ?? 0;

      const nextIndex =
        (currentIndex + direction + totalImages) % totalImages;

      return {
        ...previous,
        [productId]: nextIndex,
      };
    });
  };

  const selectProductImage = (productId, index) => {
    if (
      !productId ||
      !Number.isInteger(index) ||
      index < 0
    ) {
      return;
    }

    setImageIndexes((previous) => ({
      ...previous,
      [productId]: index,
    }));
  };

  return {
    imageIndexes,
    changeProductImage,
    selectProductImage,
  };
}
