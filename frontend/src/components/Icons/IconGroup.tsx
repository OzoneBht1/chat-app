import React from "react";

interface IconGroupProps {
  children: React.ReactNode;
}
const IconGroup = ({ children }: IconGroupProps) => {
  return <div className="flex gap-2">{children}</div>;
};

export default IconGroup;
