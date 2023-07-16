import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  const { color } = props;
  return (
    <Svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color ? "#000" : "#fff"}
      {...props}
    >
      <G fill={color ? "#000" : "#fff"}>
        <Path d="M10.77 18.3a7.53 7.53 0 110-15.06 7.53 7.53 0 010 15.06zm0-13.55a6 6 0 100 12 6 6 0 000-12z" />
        <Path d="M20 20.75a.741.741 0 01-.53-.22l-4.13-4.13a.75.75 0 011.06-1.06l4.13 4.13a.75.75 0 01-.53 1.28z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
