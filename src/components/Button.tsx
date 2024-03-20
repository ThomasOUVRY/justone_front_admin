export type ButtonProps = {
  children: string;
  onClick: () => void;
  classname?: string;
};

const Button = ({ onClick, children, classname }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={"button"}
      className={`btn btn-primary ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
