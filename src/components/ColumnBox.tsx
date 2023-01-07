import { BoxButton } from '../ui';

import '../styles/ColumnBox.scss';

function ColumnBox() {
  const boxRoutes = [
    {
      title: 'Planilhas',
      icon: 'spreadsheets.png',
    },
    {
      title: 'Folhas de Ponto',
      icon: 'pointsheets.svg',
    },
    {
      title: 'Calendário Letivo',
      icon: 'calendar.svg',
    },
    {
      title: 'Configurações',
      icon: 'settings.svg',
    },
  ];
  const boxRoutesElements = boxRoutes.map((box) => {
    const randomNumber = Math.floor(Math.random() * 10);
    const background = randomNumber % 2 == 0 ? '#333A56' : '#fff';
    const color = randomNumber % 2 != 0 ? '#333A56' : '#fff';

    return (
      <BoxButton
        title={box.title}
        icon={box.icon}
        background={background}
        color={color}
      />
    );
  });

  return (
    <div className='container'>
      {boxRoutesElements}
    </div>
  )
}

export default ColumnBox