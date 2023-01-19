import { BoxButton } from '../ui';

import { routes as boxRoutes } from '../services/routes';

import '../styles/ColumnBox.scss';
import { toCapitalize } from '../utils';

function ColumnBox() {
  const boxRoutesElements = boxRoutes.map((box) => {
    if (!box.boxButton) return;
    const randomNumber = Math.floor(Math.random() * 10);
    const background = randomNumber % 2 == 0 ? '#333A56' : '#fff';
    const color = randomNumber % 2 != 0 ? '#333A56' : '#fff';
    const title = toCapitalize(box.title);

    return (
      <BoxButton
        key={box.path}
        title={title}
        icon={box.icon}
        background={background}
        color={color}
        path={box.path}
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