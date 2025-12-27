import { Link } from "react-router-dom";
import clsx from "clsx";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-600 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white ring-blue-900 hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-900",
    red: "bg-red-600 text-white hover:text-slate-100 hover:bg-red-500 active:bg-red-800 active:text-red-100 focus-visible:outline-red-600",
    orange:
      "bg-orange-500 text-white hover:text-slate-100 hover:bg-orange-600 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-600",
    green:
      "bg-green-600 text-white hover:text-slate-100 hover:bg-green-500 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-slate-400 hover:shadow-lg text-slate-700 hover:text-slate-900 hover:bg-slate-200 hover:ring-slate-700 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-black hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
    red: "ring-red-700 text-red-700 hover:ring-red-500 active:ring-red-700 active:text-red-400 focus-visible:outline-red",
    orange:
      "ring-orange-700 text-orange-700 hover:ring-orange-500 active:ring-orange-700 active:text-orange-400 focus-visible:outline-orange",
    green:
      "ring-green-700 text-green-700 hover:ring-green-500 active:ring-slate-700 active:text-green-400 focus-visible:outline-green",
    whitebg:
      "ring-slate-700 text-black hover:text-slate-900 bg-white active:ring-slate-700 focus-visible:outline-blue-600",
  },
  disabled: {
    solid: "opacity-50 cursor-not-allowed",
    outline: "opacity-50 cursor-not-allowed",
  },
};

export function Button({
  variant = "solid",
  color = "slate",
  className,
  href,
  disabled = false,
  ...props
}) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    disabled && variantStyles.disabled[variant],
    className
  );

  return href ? (
    <Link to={href} className={className} {...props} aria-disabled={disabled} />
  ) : (
    <button className={className} disabled={disabled} {...props} />
  );
}
