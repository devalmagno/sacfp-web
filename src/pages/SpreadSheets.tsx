import { BiData, BiEdit } from 'react-icons/bi';

import { Section } from '../components'
import { BoxButton } from '../ui';

import { routes } from '../services/routes';
import { toCapitalize } from '../utils';

import '../styles/ColumnBox.scss';

function SpreadSheets() {
  const uploudData = () => {
  }

  const boxButtons = [
    {
      title: 'inserir dados',
      icon: <BiData fill="#fff" size={48} />,
      background: '#333A56',
      color: '#fff',
      func: uploudData,    
    },
    {
      title: routes[2].title,
      icon: routes[2].icon,
      background: '#fff',
      color: '#333A56',
      path: routes[2].path,
    }
  ];

  const boxButtonsElements = boxButtons.map(button => {
    const title = toCapitalize(button.title);

    return <BoxButton
      key={title}
      background={button.background}
      color={button.color}
      icon={button.icon}
      title={title}
      func={button.func}
      path={button.path}
    />
  });

  return (
    <Section>
      <div className="container">
        {boxButtonsElements}
      </div>
    </Section>
  )
}

export default SpreadSheets