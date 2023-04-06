import React from "react";
import Image from "mui-image";

const Icons = ({ src, alt, width, height, ...restProps }) => {
  return (
    <Image src={src} width={width} height={height} alt={alt} {...restProps} />
  );
};

export default Icons;
