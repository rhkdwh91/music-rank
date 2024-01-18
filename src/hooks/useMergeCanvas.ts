import { useRef } from "react";

interface MergeCanvasProps {
  canvases: (HTMLCanvasElement | null)[];
  width?: number;
  height?: number;
}

const useMergeCanvas = ({
  canvases,
  width = 200,
  height = 300,
}: MergeCanvasProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const mergeCanvas = () => {
    if (!ref.current) return;
    const canvas = ref.current;
    canvas.width = width;
    canvas.height = height;
    const mergedContext = canvas.getContext("2d");
    if (!mergedContext) return;
    const imageDatas: Uint8ClampedArray[] = [];
    canvases.forEach((canvas) => {
      if (canvas) {
        mergedContext.drawImage(canvas, 0, 0);
        const context = canvas.getContext("2d");
        if (!context) return;
        imageDatas.push(
          context.getImageData(0, 0, canvas.width, canvas.height).data
        );
      }
    });
    const mergedImageData = mergedContext.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const mergedData = mergedImageData.data;
    for (let i = 0; i < mergedData.length; i += 4) {
      // 만약 두 캔버스에서 겹치는 부분이라면 (두 이미지의 픽셀 값이 모두 0 이상이라면)
      if (imageDatas.every((imageData) => imageData[i] > 0)) {
        mergedData[i] = 0;
        mergedData[i + 1] = 255;
        mergedData[i + 2] = 0;
      }
    }
    mergedContext.putImageData(mergedImageData, 0, 0);
  };
  return {
    ref,
    mergeCanvas,
  };
};

export default useMergeCanvas;
