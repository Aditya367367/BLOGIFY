const Button = ({ children, variant = "primary", ...props }) => {
  const base =
    "w-full rounded-lg py-2 text-sm font-medium transition";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  return (
    <button className={`${base} ${styles[variant]} ${props.className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
