# React Remotion

## Getting Started

The idea is that you get a `frame` number and blank canvas to render whatever you want:

```ts
import { useCurrentFrame } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      The current frame is {frame}.
    </div>
  );
};
```

## Video properties

A video has 4 properties:

- width and height in pixels.
- durationInFrames: The number of frames which the video is long.
- fps: The amount of frames per second. The duration in frames divided by FPS results in the duration in seconds.

```ts
import { useVideoConfig } from "remotion";

export const MyVideo = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();

  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      This video is {durationInFrames / fps} seconds long.
    </div>
  );
};
```

A video's first frame is `0` and it's last frame is `durationInFrames - 1`.

## Compositions

Compositions are components with the above mentioned metadata. You can define `compositions` in `src/Video.tsx` to make them show up in the left sidebar.
