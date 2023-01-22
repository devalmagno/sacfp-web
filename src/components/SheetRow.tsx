import { Input } from '../ui';

import { Pointsheet } from '../types/DataTypes';

import '../styles/Teacher.scss';
import { useState } from 'react';

type SheetRowProps = {
    sheet: Pointsheet;
}

function SheetRow(props: SheetRowProps) {
    const [isDisabled, setIsDisabled] = useState(true);

    const toggleIsDisabled = () => {
        setIsDisabled(_prevState => !_prevState);
    }

    const sheet = {
        ...props.sheet,
        period: props.sheet.period.split(' ')[0],
        workload: `${props.sheet.workload}h/a`
    }

    return (
        <div className="info--row">
            <Input
                label='curso'
                value={sheet.course}
                width={164}
                isDisabled={isDisabled}
            />
            <Input
                label='PER.'
                value={sheet.period}
                width={56}
                isDisabled={isDisabled}
            />
            <Input
                label='disciplina'
                value={sheet.discipline}
                width={240}
                isDisabled={isDisabled}
            />
            <Input
                label='CH'
                value={sheet.workload.toString()}
                width={82}
                isDisabled={isDisabled}
            />
        </div>

    )
}

export default SheetRow