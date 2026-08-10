import React from "react";
import { Img, staticFile } from "remotion";

type Props = {
  src: string;
  size: number;
  /** Extra padding of the white disc beyond the logo (px) */
  pad?: number;
  style?: React.CSSProperties;
};

/** Soft white disc behind committee emblems for contrast on teal water */
export const CommitteeLogo: React.FC<Props> = ({
  src,
  size,
  pad = 10,
  style,
}) => {
  const disc = size + pad * 2;
  return (
    <div
      style={{
        width: disc,
        height: disc,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.78)",
        boxShadow:
          "0 4px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
        }}
      />
    </div>
  );
};
