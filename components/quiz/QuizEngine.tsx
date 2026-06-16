"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS, calcularResultado } from "@/lib/quiz-logic";
import { QuizAnswers, QuizResult as QuizResultType } from "@/types/quiz";
import QuizProgress from "./QuizProgress";
import QuizStep from "./QuizStep";
import EmailCapture from "./EmailCapture";
import QuizResult from "./QuizResult";

type Phase = "quiz" | "email" | "result";

export default function QuizEngine() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [direction, setDirection] = useState(1);

  const totalSteps = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep) / totalSteps) * 100;

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setDirection(1);
        setCurrentStep((s) => s + 1);
      } else {
        setPhase("email");
      }
    }, 300);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const handleEmailSubmit = () => {
    const res = calcularResultado(answers);
    setResult(res);
    setPhase("result");
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setPhase("quiz");
    setResult(null);
    setDirection(1);
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Progress */}
      {phase === "quiz" && (
        <QuizProgress
          current={currentStep + 1}
          total={totalSteps}
          percent={progress}
        />
      )}

      {/* Question / Email / Result */}
      <AnimatePresence mode="wait" custom={direction}>
        {phase === "quiz" && (
          <motion.div
            key={`step-${currentStep}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuizStep
              question={question}
              selectedAnswer={answers[question.id] ?? null}
              onAnswer={handleAnswer}
              onPrev={currentStep > 0 ? handlePrev : undefined}
              stepIndex={currentStep}
            />
          </motion.div>
        )}

        {phase === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <EmailCapture
              onSubmit={handleEmailSubmit}
              onBack={() => {
                setDirection(-1);
                setPhase("quiz");
                setCurrentStep(totalSteps - 1);
              }}
              answers={answers}
            />
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuizResult result={result} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
