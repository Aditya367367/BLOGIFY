import { useEffect } from "react";
import { Check, X, AlertCircle, Info } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: "text-green-600",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: "text-yellow-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "text-blue-600",
    },
  };

  const style = styles[type] || styles.info;

  const icons = {
    success: <Check size={20} className={style.icon} />,
    error: <X size={20} className={style.icon} />,
    warning: <AlertCircle size={20} className={style.icon} />,
    info: <Info size={20} className={style.icon} />,
  };

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm ${style.bg} border ${style.border} rounded-lg p-4 shadow-2xl flex items-start gap-3 animate-fadeIn z-[9999]`}
    >
      {icons[type]}
      <p className={`${style.text} text-sm font-medium flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`${style.icon} hover:opacity-80 transition`}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
