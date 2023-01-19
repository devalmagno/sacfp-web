import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BiNoEntry } from 'react-icons/bi';

import '../styles/BoxButton.scss';

type BoxButtonProps = {
  title: string;
  icon: string | ReactNode;
  background: string;
  color: string;
  path?: string;
  func?: () => void;
}

function BoxButton(props: BoxButtonProps) {
  const iconType =
    typeof (props.icon) === 'string' ?
      props.icon.substring(props.icon.length - 3) == 'svg' :
      'react-icon';

  return (
    <>
      {
        props.path ?
          (
            <Link to={props.path}>
              <div
                className="container__box"
                style={{ background: props.background }}
              >
                <div></div>
                {iconType != 'react-icon' ?
                  <img
                    src={`./icons/${props.icon}`}
                    alt={props.title}
                    className={iconType ? 'svg' : ''}
                  /> :
                  props.icon
                }

                <strong style={{ color: props.color }}>{props.title}</strong>
              </div>
            </Link>
          ) :
          (
            <div
              className="container__box"
              style={{ background: props.background }}
              onClick={props.func}
            >
              <div></div>
              {iconType != 'react-icon' ?
                <img
                  src={`./icons/${props.icon}`}
                  alt={props.title}
                  className={iconType ? 'svg' : ''}
                /> :
                props.icon
              }

              <strong style={{ color: props.color }}>{props.title}</strong>
            </div>
          )
      }
    </>
  )
}

export default BoxButton