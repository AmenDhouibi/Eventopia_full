import React from "react";

const sizes = {
  xs: "text-[25px] font-normal md:text-[23px] sm:text-[21px]",
  lg: "text-6xl font-medium md:text-[52px] sm:text-[46px]",
  s: "text-3xl font-normal md:text-[28px] sm:text-[26px]",
  md: "text-[40px] font-medium md:text-[38px] sm:text-4xl",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-blue_gray-900 font-josefinsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
