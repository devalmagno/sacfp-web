import { BiChevronDownCircle } from 'react-icons/bi';

import '../styles/SavedPopUp.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function SavedPopUp({ setShow, show }: Props) {
  setTimeout(() => {
    setShow(false);
  }, 1500);

  if (!show) return <></>;

  return (
    <div id="over" className="sucess--container">
      <div className="box--icon">
        <BiChevronDownCircle fill='#fff' size={32} />
      </div>
      <div className="sucess--text">
        <h4>Sucesso</h4>
        <span>A informação foi salva com sucesso</span>
        <div className="progress-bar"></div>
      </div>
    </div>
  )
}

export default SavedPopUp;