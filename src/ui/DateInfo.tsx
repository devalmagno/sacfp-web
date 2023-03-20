import { BiTrash } from 'react-icons/bi';

import { Activity_dates } from '../types/DataTypes'

import '../styles/DateInfo.scss';
import Button from './Button';

type Props = {
    date: Activity_dates;
    func: () => void;
}

function DateInfo(props: Props) {

    return (
        <div className="date-info--container">
            <div className="info">
                <div className="flex-column" style={{ rowGap: 4 }}>
                    <strong>Informação sobre o dia {props.date.date}</strong>
                    <span>{props.date.description}</span>
                    <span>{props.date.reference_day}</span>
                </div>
                <Button
                    icon={<BiTrash fill="#333A56" size={20} />}
                    style={{ backgroundColor: "#fff", }}
                    onClick={props.func}
                />

            </div>
        </div>
    )
}

export default DateInfo