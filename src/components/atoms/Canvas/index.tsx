import React, {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  forwardRef,
} from "react";

export interface CanvasProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
  return <canvas ref={ref} {...props} />;
});

export default Canvas;
