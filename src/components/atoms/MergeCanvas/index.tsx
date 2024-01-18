import { useEffect } from "react";
import useMergeCanvas from "hooks/useMergeCanvas";
import Canvas from "components/atoms/Canvas";

interface MergeCanvasProps {
    canvases: (HTMLCanvasElement|null)[];
}

export default function MergeCanvas ({ canvases }: MergeCanvasProps) {
    const { ref, mergeCanvas } = useMergeCanvas({ canvases });

    useEffect(() => {
        mergeCanvas();
    }, []);

    return (
        <Canvas ref={ref} />
    )
}