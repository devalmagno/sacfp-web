import { BiNoEntry } from 'react-icons/bi';
import '../styles/BoxButton.scss';

type BoxButtonProps = {
  title: string;
  icon: string;
  background: string;
  color: string;
}

function BoxButton(props: BoxButtonProps) {
  const iconType = props.icon.substring(props.icon.length - 3) == 'svg';

  return (
    <div 
      className="container__box"
      style={{ background: props.background }}
    >
        <div></div>
        <img 
          src={`./icons/${props.icon}`} 
          alt={props.title} 
          className={iconType ? 'svg' : ''}
        />
      <strong style={{ color: props.color }}>{props.title}</strong>
    </div>
  )
}

export default BoxButton