import { ReactNode, useEffect } from 'react';

import { toCapitalize } from '../utils';

import '../styles/Button.scss';

type ButtonProps = {
  title?: string;
  style?: any;
  icon?: ReactNode;
  onClick?: () => void;
  tooltip?: string;
  isDisabled?: boolean;
  submit?: boolean;
}

function Button(props: ButtonProps) {
  const title = props.title ? props.title.toUpperCase() : '';
  const tooltip = props.tooltip ? toCapitalize(props.tooltip) : '';

  const func = props.isDisabled ? () => {} : props.onClick;

  const style = {
    backgroundColor: "#333A56",
    color: '#fff',
    ...props.style
  }

  return (
    <button 
      style={props.isDisabled ? {...style, backgroundColor: '#e9ecef', color: '#6c757d'} : style} 
      onClick={func} 
      disabled={props.isDisabled}
      type={props.submit ? 'submit' : 'button'}
    >
      {title}{props.icon}
      {props.tooltip && (
        <div className='tooltip'>
          <span>{tooltip}</span>
        </div>
      )}
    </button>
  )
}

export default Button