import { ReactNode } from 'react';

import '../styles/Button.scss';

type ButtonProps = {
  title?: string;
  style?: any;
  icon?: ReactNode;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const title = props.title ? props.title.toUpperCase() : '';

  return (
    <button style={props.style} onClick={props.onClick}>
      {title}{props.icon}
    </button>
  )
}

export default Button