import React from "react";

const Svg = ({ fill, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="91"
      viewBox="0 0 23 91"
      fill={fill}
    >
      <g filter="url(#filter0_d_2_388)">
        <path
          d="M16.1945 32.4285C5.1694 20.5126 0.809012 6.41272 0 0V82.8C0 68.0253 8.85091 54.069 16.4659 45.3288C19.6309 41.6961 19.4666 35.965 16.1945 32.4285Z"
          fill={fill}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2_388"
          x="-4"
          y="0"
          width="26.7469"
          height="90.8"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_388"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_388"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2_388"
          x1="11.5"
          y1="0"
          x2="11.5"
          y2="82.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9664FF" />
          <stop offset="1" stop-color="#854EF9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Svg;
