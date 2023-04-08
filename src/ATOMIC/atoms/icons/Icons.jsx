import React from "react";
import Image from "mui-image";

const Icons = ({ src, alt, width, height, type, ...restProps }) => {
  return (
    <Image
      src={type === "icon" ? "/Images/icons/" + src + ".jpg" : src}
      width={width}
      height={height}
      alt={alt}
      {...restProps}
    />
  );
};

export default Icons;
