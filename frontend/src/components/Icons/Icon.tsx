import classNames from "classnames";
import React from "react";

interface IconProps {
  height?: number;
  width?: number;
  bgColor?: string;
  border?: string;
  children: React.ReactNode;
}

const Icon = ({
  height = 12,
  width = 12,
  bgColor = "bg-gray-200",
  border,
  children,
  ...rest
}: IconProps) => {
  const className = classNames(
    "flex items-center justify-center p-2 rounded-full",
    {
      [`h-${height}`]: height,
      [`w-${width}`]: width,
      [`${bgColor}`]: bgColor,
      [`${border}`]: border,
    }
  );
  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};

export default Icon;
