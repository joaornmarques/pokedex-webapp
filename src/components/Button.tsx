import './../assets/styles/button.css';

interface ButtonProps {
  children?: React.ReactNode;
  size?: string | null;
  variant?: string | null;
  customClasses?: string | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ children, size, variant, customClasses, onClick }: ButtonProps) {
  return (
    <button
      className={`button ${size ? `button--${size}` : ''} ${variant ? `button--${variant}` : ''} ${customClasses ? `${customClasses}` : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;