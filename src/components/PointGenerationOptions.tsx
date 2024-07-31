import { useState } from "react";
import { Button } from "../ui";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useDataContext } from "../contexts";

export default function PointGenerationOptions() {
  const { config, setConfig } = useDataContext();
  const [limitPointGeneration, setLimitPointGeneration] = useState(
    config.limitPointGeneration
  );

  const configRef = doc(db, "config", config.id);

  function handleLimitPointGenerationChange() {
    setLimitPointGeneration(!limitPointGeneration);
  }

  const updateLimitPointGeneration = async () => {
    await updateDoc(configRef, {
      limitPointGeneration,
    });

    setConfig({
      ...config,
      limitPointGeneration,
    });
  };

  return (
    <div>
      <div className="box-container" onClick={handleLimitPointGenerationChange}>
        <input type="checkbox" checked={limitPointGeneration} readOnly />{" "}
        <span style={{ cursor: "pointer" }}>
          Limitar a carga horária da disciplina.
        </span>
      </div>
      <Button
        title="Salvar"
        isDisabled={config.limitPointGeneration === limitPointGeneration}
        onClick={updateLimitPointGeneration}
      />
    </div>
  );
}
