import { useEffect } from "react";
import { useState } from "react";
// import { GlobalContext } from "../contexts/GlobalContext";

const useResponsiveText = (containerRef, scale, min) => {
  // const globalData = useContext(GlobalContext);
  const [fs, setFS] = useState();

  useEffect(() => {
    const container = containerRef.current.getBoundingClientRect().width;
    const fs = `${Math.max(
      Math.ceil(container * scale || 0.96),
      min || "10"
    )}px`;
    setFS(fs);
  }, [containerRef]);
  return fs;
};

export default useResponsiveText;
