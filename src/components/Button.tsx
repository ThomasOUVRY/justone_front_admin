export type ButtonProps = {
    children: string
    onClick: () => void
}

const Button = ({onClick, children}: ButtonProps) => {
    return <button onClick={onClick}>{children}</button>
}

export default Button;
