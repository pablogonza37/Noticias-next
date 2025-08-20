"use client";
import React from "react";
import Image from "next/image";

const SmartImage = ({ src, alt, width = 600, height = 1000, className }) => {
  if (!src || src.includes("politico.com") || src.includes("dcrainmaker.com")) {
    return (
      <img
        src={src || "/fallback.jpg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default SmartImage;