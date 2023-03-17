import { ReactNode } from 'react';

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

  const isDisabled = props.isDisabled || false;
  const func = isDisabled ? () => {} : props.onClick;

  const style = {
    background: "#333A56",
    color: '#fff',
    ...props.style
  }

  return (
    <button 
      style={isDisabled ? {...style, backgroundColor: '#e9ecef', color: '#6c757d'} : style} 
      onClick={func} 
      disabled={isDisabled}
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