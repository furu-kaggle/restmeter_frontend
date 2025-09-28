import React, { useState } from 'react';
import { Survey } from './components/Survey';
import { Results } from './components/Results';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SurveyData } from './types';

function App() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const handleSurveyComplete = (data: SurveyData) => {
    setSurveyData(data);
    setShowResults(true);
  };

  const handleRestart = () => {
    setSurveyData(null);
    setShowResults(false);
    setShowSurvey(false);
  };

  const handleStartSurvey = () => {
    setShowSurvey(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!showSurvey && !showResults ? (
          <LandingPage onStartSurvey={handleStartSurvey} />
        ) : !showResults ? (
          <Survey onComplete={handleSurveyComplete} />
        ) : (
          <Results 
            data={surveyData!} 
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;