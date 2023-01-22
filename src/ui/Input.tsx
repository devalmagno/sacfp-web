import '../styles/Input.scss';

type InputProps = {
    value: string;
    label: string;
    width: number;
    isDisabled: boolean;
    fontSize?: number;
}

function Input(props: InputProps) {
    const style = {
        width: `${props.width}px`,
    };

    const inputStyle = {
        fontSize: `${props.fontSize}px`
    }

  return (
    <div className="container--input" style={style}>
        <input 
            id="input" 
            type="text" 
            value={props.value}
            disabled={props.isDisabled}
            style={inputStyle}
            required
        />
        <label htmlFor="input">{props.label}</label>
    </div>
  )
}

export default Input