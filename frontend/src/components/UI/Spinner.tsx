import classNames from "classnames";

interface ISpinnerProps {
  height?: number;
  width?: number;
}

export default function Spinner({ height, width }: ISpinnerProps) {
  const divClasses = classNames(
    "inline-block  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
    {
      "h-8 w-8": !height && !width,
      [`h-${height} w-${width}`]: height && width,
    }
  );
  return (
    <div className={divClasses} role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
