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

  return (
    <button 
      style={props.style} 
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