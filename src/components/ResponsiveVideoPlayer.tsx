import React from "react";

interface ResponsiveVideoPlayerProps {
  src: string;
  title?: string;
  aspectRatio?: string; // e.g. "16:9" or "4:3"
  allowFullScreen?: boolean;
  style?: React.CSSProperties;
}

const getPaddingBottom = (aspectRatio: string = "16:9") => {
  const [w, h] = aspectRatio.split(":").map(Number);
  if (!w || !h) return "56.25%";
  return `${(h / w) * 100}%`;
};

const ResponsiveVideoPlayer: React.FC<ResponsiveVideoPlayerProps> = ({
  src,
  title = "Video Player",
  aspectRatio = "16:9",
  allowFullScreen = true,
  style = {},
}) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      paddingBottom: getPaddingBottom(aspectRatio),
      margin: 0,
      maxWidth: 900,
      marginLeft: "auto",
      marginRight: "auto",
      ...style,
    }}
  >
    <iframe
      src={src}
      title={title}
      allowFullScreen={allowFullScreen}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  </div>
);

export default ResponsiveVideoPlayer;
