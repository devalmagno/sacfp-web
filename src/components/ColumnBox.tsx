import { useAuthContext } from '../contexts';

import { BoxButton } from '../ui';

import { routes as boxRoutes } from '../services/routes';
import { toCapitalize } from '../utils';

import '../styles/ColumnBox.scss';

function ColumnBox() {
  const { authUser, userList } = useAuthContext();

  const boxRoutesElements = boxRoutes.filter(box => {
    const adminUsers: string[] = userList.filter(e => e.type === 'admin').map(e => e.email);
    const isAdmin = adminUsers.some(e => e === authUser?.email);
    if (!isAdmin && box.requireAdmin) return;

    return box;
  })
    .map((box) => {
      if (!box.boxButton) return;
      const randomNumber = Math.floor(Math.random() * 10);
      const background = randomNumber % 2 == 0 ? '#333A56' : '#ffffff';
      const color = randomNumber % 2 != 0 ? '#333A56' : '#ffffff';
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