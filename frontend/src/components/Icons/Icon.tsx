import React from "react";

interface IconProps {
  height?: number;
  width?: number;
  color?: string;
  stroke?: string;
  children: React.ReactNode;
}

const Icon = ({
  height = 40,
  width = 40,
  color,
  stroke,
  children,
  ...rest
}: IconProps) => {
  return (
    <div
      style={{
        height: height,
        width: width,
      }}
      className={"${color && stroke ? `text-${color}-${stroke}` : "}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Icon;
