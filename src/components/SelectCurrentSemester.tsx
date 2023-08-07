import { useState } from 'react';
import { doc, updateDoc } from '@firebase/firestore';

import { useDataContext } from '../contexts/DataContext';

import { Button } from '../ui';

import { db } from '../services/firebaseConfig';

export default function SelectCurrentSemester() {
    const { calendarList, config, setConfig, setSemester } = useDataContext();

    const [selectedSemester, setSelectedSemester] = useState(config.semester);

    const semesterList = calendarList.map(e => `${e.semester}${e.acronym}`).sort();

  const updateConfig = async () => {
    const configDoc = doc(db, "config", config.id);

    await updateDoc(configDoc, {
      ...config,
      semester: selectedSemester,
    });

    setConfig(prevState => ({
      ...prevState,
      semester: selectedSemester
    }));

    setSemester(selectedSemester);
  }

    const semesterElements = semesterList.map(e => {
        const isSelected = e === selectedSemester;

        return (
            <div
                className={isSelected ?
                    "box select" :
                    "box"
                }
                key={e}
                onClick={() => { setSelectedSemester(e) }}
            >
                {e}
            </div>
        )
    });

    return (
        <div className="column">
            <div className="box--container">
                {semesterElements}
            </div>

            <Button
                title='Salvar'
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={updateConfig}
                isDisabled={config.semester === selectedSemester}
            />
        </div>
    )
}