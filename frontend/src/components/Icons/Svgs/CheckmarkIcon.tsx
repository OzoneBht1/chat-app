import { ISvgProps } from "@/types/icon";

const CheckMark = (props: ISvgProps) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Interface / Check">
        <path
          id="Vector"
          d="M6 12L10.2426 16.2426L18.727 7.75732"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};
export default CheckMark;
