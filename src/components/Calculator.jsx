import React, { useState } from "react";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [phase1Data, setPhase1Data] = useState(null);
  const [phase2Data, setPhase2Data] = useState(null);

  const handleNextPhase1 = (data) => {
    setPhase1Data(data);

    setStep(2);
  };

  const handleNextPhase2 = (data) => {
    setPhase2Data(data);
    setStep(3);
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(1, prev - 1)); // Prevent going below Phase 1
  };

  return (
    <div>
      {step === 1 && (
        <Phase1 onNext={handleNextPhase1} phase1Data={phase1Data} />
      )}
      {step === 2 && (
        <Phase2
          phase1Data={phase1Data}
          onNext={handleNextPhase2}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <Phase3
          phase1Data={phase1Data}
          phase2Data={phase2Data}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
