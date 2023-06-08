import { MdEmail } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io';

import '../styles/CardEmail.scss';

type CardEmailProps = {
  id: string;
  name: string;
  userType: string;
  email: string;

  deleteUser: (id: string) => void;
}

function CardEmail(props: CardEmailProps) {
  const name = props.name === '' ? "Sem nome" : capitalize(props.name);
  const email = props.email.toLowerCase();
  const userTypeList = [
    { type: "admin", shows: "admin", name: "Administrador" },
    { type: "external", shows: "admin", name: "Usuário Externo" },
  ];
  const type = userTypeList.find(e => e.type === props.userType)?.name;

  function capitalize(value: string) {
    return value.toLowerCase().split(' ').map(e => `${e[0].toUpperCase()}${e.substring(1, e.length)}`).toString().replaceAll(',', ' ');
  }

  return (
    <div className="card-email--container">
      <MdEmail fill="#717171" size={20} />
      <div className="user--info">
        <strong>{name}</strong>
        <span style={{ fontSize: '12.8px' }}>{type}</span>
        <span>{email}</span>
      </div>
      <IoMdTrash
        fill="#717171"
        size={20}
        style={{ cursor: 'pointer', }}
        onClick={() => { props.deleteUser(props.id) }}
      />
    </div>
  )
}

export default CardEmail