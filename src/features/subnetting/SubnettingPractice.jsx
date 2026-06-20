import { useMemo, useState } from "react"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { checkSubnetPracticeAnswers, generateSubnetPracticeBank } from "../../lib/subnetting.js"

export function SubnettingPractice({ onBack = null }) {
  const bank = useMemo(() => generateSubnetPracticeBank(360), [])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const prompt = bank[index % bank.length]
  const answerFields = prompt.answers
  const octets = prompt.address.includes(".") ? prompt.address.split(".") : []
  const result = checked ? checkSubnetPracticeAnswers(answers, prompt) : {}
  const correctCount = checked ? Object.values(result).filter(Boolean).length : 0
  const perfect = checked && correctCount === answerFields.length
  const setAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }))
    setChecked(false)
  }
  const checkAnswers = () => {
    if (checked) return
    const checkedResult = checkSubnetPracticeAnswers(answers, prompt)
    const nextCorrectCount = Object.values(checkedResult).filter(Boolean).length
    const nextStreak = nextCorrectCount === answerFields.length ? streak + 1 : 0
    setStreak(nextStreak)
    setBestStreak((current) => Math.max(current, nextStreak))
    setChecked(true)
  }
  const nextQuestion = () => {
    setIndex((current) => (current + 1) % bank.length)
    setAnswers({})
    setChecked(false)
  }

  return (
    <section className="subnet-phone-shell" aria-label="Subnetting Practice">
      <header className="subnet-phone-header">
        <button type="button" onClick={onBack ?? nextQuestion} aria-label={onBack ? "Back" : "Previous screen"}>
          <ArrowLeft size={34} />
        </button>
        <h2>Subnetting Practice</h2>
      </header>
      <div className="subnet-drill-meter" aria-label={`Question ${index + 1} of ${bank.length}`}>
        <span style={{ width: `${((index + 1) / bank.length) * 100}%` }} />
      </div>
      <div className="subnet-question-card">
        <div className="subnet-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="subnet-question-topline">
          <strong>For given details</strong>
          <span>{prompt.prefix === null ? "BIN" : `/${prompt.prefix}`}</span>
        </div>
        <p>
          {prompt.prompt}
          {prompt.type === "classic" && (
            <>
              <br />
              CIDR NetMask {prompt.netmask}
            </>
          )}
        </p>
        {prompt.type !== "classic" && (
          <p className="subnet-mode-copy">
            Mode: {prompt.mode}
            <br />
            Reference: {prompt.netmask}
          </p>
        )}
        {octets.length > 0 && (
          <div className="subnet-octets" aria-label={`IP octets ${prompt.address}`}>
            {octets.map((octet, octetIndex) => (
              <span key={`${prompt.id}-${octetIndex}`}>
                <b>O{octetIndex + 1}</b>
                {octet}
              </span>
            ))}
          </div>
        )}
        <div className="subnet-mini-stats" aria-label="Question details">
          <span>{prompt.mode}</span>
          {prompt.answer.totalAddresses && <span>{prompt.answer.totalAddresses.toLocaleString()} total addresses</span>}
          {prompt.answer.usableHosts !== undefined && <span>{Number(prompt.answer.usableHosts).toLocaleString()} valid hosts</span>}
          <span>Streak {streak}</span>
        </div>
      </div>
      <div className="subnet-answer-card">
        <div className="subnet-answer-heading">
          <h3>Find following</h3>
          <span>Best streak {bestStreak}</span>
        </div>
        {answerFields.map((field) => {
          const state = checked ? result[field.key] : null
          return (
            <label className={`subnet-answer-line ${state === true ? "is-correct" : ""} ${state === false ? "is-wrong" : ""}`} key={field.key}>
              <span>{field.label}</span>
              <div>
                <input
                  value={answers[field.key] ?? ""}
                  onChange={(event) => setAnswer(field.key, event.target.value)}
                  placeholder="ans?"
                  inputMode={field.inputMode}
                  aria-label={field.label}
                />
                {state === true && <CheckCircle2 size={19} />}
                {state === false && <XCircle size={19} />}
              </div>
              {state === false && (
                <small>Correct: {field.value}</small>
              )}
            </label>
          )
        })}
      </div>
      {checked && (
        <p className={`subnet-score ${perfect ? "is-perfect" : ""}`} role="status">
          {perfect
            ? `Clean subnet. ${streak} in a row.`
            : `${correctCount} of ${answerFields.length} correct. Tighten the boundary and try the next one.`}
        </p>
      )}
      <button className="subnet-action" type="button" onClick={checkAnswers}>
        Check Answers
      </button>
      <button className="subnet-action" type="button" onClick={nextQuestion}>
        Try New Question
      </button>
      <div className="subnet-bank-count">
        Question {index + 1} of {bank.length}
      </div>
    </section>
  )
}
