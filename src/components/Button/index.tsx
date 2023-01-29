interface ButtonProps {
  text: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}


function Button({ text, onClick, active, disabled }: ButtonProps) {

  const buttonStyle = active 
    ? "border-2 border-green-600 rounded-full px-4 py-2 font-bold bg-green-600 text-white"
    : `border-2 border-green-600 rounded-full px-4 py-2 font-bold ${disabled ? "" : "hover:bg-green-600 hover:text-white"}"`; 

  return (
    <button disabled={disabled} className={buttonStyle} onClick={() => onClick()}>
      {text}
    </button>
  )
}

export default Button;
