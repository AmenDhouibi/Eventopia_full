import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[10px]",
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    red_400: "bg-red-400 text-white-A700",
    blue_gray_100_7f: "bg-blue_gray-100_7f text-blue_gray-900",
  },
  outline: {
    yellow_400: "border-yellow-400 border-2 border-solid text-black-900",
  },
};
const sizes = {
  xs: "h-[41px] px-[15px] text-xl",
  lg: "h-[80px] pl-[35px] pr-[23px] text-[45px]",
  sm: "h-[66px] pl-[35px] pr-[23px] text-[45px]",
  md: "h-[68px] px-[34px] text-[40px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "outline",
  size = "md",
  color = "yellow_400",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round", "square"]),
  size: PropTypes.oneOf(["xs", "lg", "sm", "md"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["red_400", "blue_gray_100_7f", "yellow_400"]),
};

export { Button };
