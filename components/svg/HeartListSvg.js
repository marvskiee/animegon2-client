import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 6A.75.75 0 013 5.25h18a.75.75 0 010 1.5H3A.75.75 0 012.25 6zm0 4A.75.75 0 013 9.25h18a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4a.75.75 0 01.75-.75h7a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4a.75.75 0 01.75-.75h7a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z"
        fill="#fff"
        opacity={0.5}
      />
      <Path
        d="M14 15.036c0 1.235 1.485 2.543 2.52 3.305.435.32.652.48.98.48.328 0 .545-.16.98-.48 1.035-.762 2.52-2.07 2.52-3.305 0-2.008-1.925-2.757-3.5-1.206-1.575-1.551-3.5-.802-3.5 1.206z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
