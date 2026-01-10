import React, { useState } from 'react';
import styles from './FloatingDrawer.module.css';
import { Radio, RadioGroup, Checkbox } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import choicesData from '../../CTAJourneyChoices.json';

interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  options?: string[];
}

interface JourneySurveyProps {
  questions: Question[];
  onComplete: (answers: Record<string, any>) => void;
}

export const JourneySurvey: React.FC<JourneySurveyProps> = ({ questions, onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const current = questions[step];
  const isFirst = step === 0;
  const isLast = step === questions.length - 1;

  const handleChange = (value: any) => {
    setAnswers(a => ({ ...a, [current.id]: value }));
  };

  const handleNext = async () => {
    if (!isLast) {
      setStep(s => s + 1);
    } else {
      setSubmitting(true);
      try {
        await fetch('https://ee9ffbbcb17ae277b5341496799d04.c5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/c7552ccbe28e465db77ea1332e034e14/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=npLT9YLSsYCKi-DpiHletPFmCnQOVGJ81nkFtICg2eo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(answers)
        });
      } catch (e) {
        // Optionally handle error
      }
      setTimeout(() => {
        setSubmitting(false);
        setShowResult(true);
        onComplete(answers);
      }, 500);
    }
  };

  const handleBack = () => setStep(s => (s > 0 ? s - 1 : 0));

  if (submitting) return <div style={{textAlign:'center',padding:'2rem'}}><div className="spinner" />Crafting your Evergreen pathway…</div>;
  if (showResult) return (
    <div style={{textAlign:'center',padding:'2rem'}}>
      <h2 className={styles.drawerTitle}>Your Evergreen Pathway</h2>
      <p className={styles.drawerSubtitle}>Based on what you shared, here's where you'll see the biggest impact.</p>
      <div style={{background:'#f6faf6',borderRadius:12,padding:'1.5rem',marginTop:'1rem'}}>Recommendation placeholder</div>
    </div>
  );

  // Get real options for this question from choicesData
  const realOptions = choicesData
    .filter(c => c.Question === current.question && c.Choice != null)
    .map(c => String(c.Choice));

  return (
    <div>
      <div className={styles.drawerTitle} style={{marginTop:0}}>Let's shape the team you want to lead</div>
      <div className={styles.drawerSubtitle}>A few quick questions to understand your culture and collaboration goals.</div>
      <div style={{height: '1.5rem'}} />
      <div style={{marginBottom:'2rem'}}>
        <div style={{fontWeight:600,marginBottom:8,fontSize:'1.35rem'}}>{current.question}</div>
        {current.type === 'radio' && realOptions.length > 0 && (
          <RadioGroup
            value={answers[current.id] ?? ''}
            onChange={(_, data) => handleChange(data.value)}
            className={styles.surveyOptionsGroup}
          >
            {realOptions.map(opt => (
              <div key={opt} className={styles.surveyOption + (answers[current.id] === opt ? ' ' + styles.surveyOptionSelected : '') + ' ' + styles.surveyOptionFullWidth}>
                <Radio value={opt} style={answers[current.id] === opt ? { '--colorChecked': 'var(--fluent-fontColor, #1b1a19)' } as React.CSSProperties : {}} />
                <span style={{marginLeft: '1rem'}}>{opt}</span>
              </div>
            ))}
          </RadioGroup>
        )}
        {current.type === 'checkbox' && realOptions.length > 0 && (
          <div className={styles.surveyOptionsGroup}>
            {realOptions.map(opt => (
              <div key={opt} className={styles.surveyOption + (Array.isArray(answers[current.id]) && answers[current.id].includes(opt) ? ' ' + styles.surveyOptionSelected : '') + ' ' + styles.surveyOptionFullWidth}>
                <Checkbox
                  checked={Array.isArray(answers[current.id]) && answers[current.id].includes(opt)}
                  onChange={(_, data) => {
                    const arr = Array.isArray(answers[current.id]) ? answers[current.id] : [];
                    handleChange(
                      data.checked
                        ? [...arr, opt]
                        : arr.filter((v: string) => v !== opt)
                    );
                  }}
                />
                <span style={{marginLeft: '1rem'}}>{opt}</span>
              </div>
            ))}
          </div>
        )}
        {current.type === 'text' && (
          <div className={styles.surveyTextAreaWrapper}>
            <textarea
              className={styles.surveyTextArea}
              value={answers[current.id] || ''}
              onChange={e => handleChange(e.target.value)}
            />
          </div>
        )}
      </div>
      <div style={{height: '2.5rem'}} />
      <div className={styles.surveyActions + (!isFirst ? ' ' + styles.surveyActionsRow : '')}>
        {!isFirst && (
          <button
            type="button"
            className={styles.surveyBackBtn}
            onClick={handleBack}
          >
            <ArrowLeft24Regular style={{ verticalAlign: 'middle', marginRight: 8 }} />
            <span style={{ verticalAlign: 'middle' }}>Back</span>
          </button>
        )}
        <button
          type="button"
          className={
            styles.surveyNextBtn +
            ' ' + styles.surveyOptionFullWidth +
            (!isFirst ? ' ' + styles.surveyNextBtnRow : '')
          }
          onClick={handleNext}
          disabled={
            (current.type === 'radio' && !answers[current.id]) ||
            (current.type === 'checkbox' && (!answers[current.id] || answers[current.id].length === 0)) ||
            (current.type === 'text' && !answers[current.id])
          }
        >
          {isLast ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};
