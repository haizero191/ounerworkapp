import React, { useEffect, useState } from "react";

const RenderImage = ({src,containerWidth,containerHeight,aspectRatios}) => {
  const [imageDimensions, setImageDimensions] = useState({
    name: "",
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Hàm điều chỉnh tỷ lệ hình ảnh
    const adjustImageToAspectRatio = (width, height, aspectRatios) => {
      let bestFit = null;
      let bestFitScale = -Infinity;

      aspectRatios.forEach((ratio) => {
        const targetWidth = ratio.ratioX;
        const targetHeight = ratio.ratioY;

        const scale = Math.min(width / targetWidth, height / targetHeight);

        if (scale > bestFitScale) {
          bestFitScale = scale;
          bestFit = ratio;
        }
      });

      if (bestFit) {
        return {
          name: bestFit.name,
          width: containerWidth,
          height: bestFit.ratioY * bestFitScale,
        };
      }

      return null;
    };

    // Giả sử chiều cao container được tính dựa trên chiều rộng và tỷ lệ
    const adjustedImage = adjustImageToAspectRatio(
      containerWidth,
      containerHeight,
      aspectRatios
    );

    if (adjustedImage) {
      setImageDimensions({
        name: adjustedImage.name,
        width: adjustedImage.width,
        height: adjustedImage.height,
      });
    }
  }, [containerHeight, aspectRatios]);

  return (
    <img
      src={src}
      width={imageDimensions.width}
      height={imageDimensions.height}
      style={{ objectFit: "cover", display: "block" }}
      alt={imageDimensions.name}
    />
  );
};

export default RenderImage;
