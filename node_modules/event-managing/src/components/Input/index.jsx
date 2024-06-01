import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[30px]",
};

const variants = {
  fill: {
    blue_gray_100: "bg-blue_gray-100 shadow-xs",
  },
};

const sizes = {
  xs: "h-[91px] px-5",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "xs",
      color = "blue_gray_100",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e.target.value); // Pass updated value directly
    };

    return (
      <>
        <div
          className={`${className} flex items-center justify-center self-stretch bg-blue_gray-100 shadow-xs rounded-[30px] ${(shape && shapes[shape]) || ""} ${variants[variant]?.[color] || variants[variant] || ""} ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input ref={ref} type={type} name={name} onChange={(e) => onChange(e)} placeholder={placeholder} {...restProps} />
          {!!suffix && suffix}
        </div>
      </>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["blue_gray_100"]),
  onChange: PropTypes.func, // Add prop type for onChange event handler
};

export { Input };
