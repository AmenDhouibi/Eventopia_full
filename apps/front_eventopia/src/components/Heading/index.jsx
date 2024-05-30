import React from "react";

const sizes = {
  s: "text-[80px] font-bold md:text-5xl",
  xs: "text-[40px] font-bold md:text-[38px] sm:text-4xl",
};

const Heading = ({ children, className = "", size = "s", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-blue_gray-900 font-josefinsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
