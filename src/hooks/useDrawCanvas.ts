import { useRef, useState, useEffect } from "react";

interface DrawCanvasProps {
  width?: number;
  height?: number;
  lineJoin?: CanvasLineJoin;
  lineWidth?: number;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  init?: boolean;
}

const useDrawCanvas = ({
  width = 200,
  height = 300,
  lineJoin = "round",
  lineWidth = 2.5,
  strokeStyle = "#000000",
  init,
}: DrawCanvasProps) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    if (init) {
      const canvasRef: React.RefObject<HTMLCanvasElement> = ref;
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const initCtx = canvas.getContext("2d");
      if (!initCtx) return;
      initCtx.lineJoin = lineJoin;
      initCtx.lineWidth = lineWidth;
      initCtx.strokeStyle = strokeStyle;
      setCtx(initCtx);
    }
  }, [init]);

  const drawFn = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (!ctx) return;
    if (painting) {
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
  };

  return {
    ref,
    ctx,
    setCtx,
    drawFn,
    setPainting,
  };
};

export default useDrawCanvas;
