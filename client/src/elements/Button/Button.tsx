import "./Button.css";

const Button = ({
  children,
  onClick,
  size,
  span,
  type,
}: {
  children: string;
  onClick?: (data?: any) => void;
  size?: `sm` | `md` | `lg`;
  type?: `submit` | `button`;
  span?: boolean;
}) => {
  return (
    <button
      type={type || "button"}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={`btn ${size || ``} ${span ? `flex1` : ``}`}
    >
      {children}
    </button>
  );
};

export default Button;
