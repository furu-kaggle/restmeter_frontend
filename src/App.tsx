import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SurveyPage } from './components/SurveyPage';
import { Results } from './components/Results';
import { SurveyData } from './types';

type AppPage = 'landing' | 'check' | 'result';

const pathToPage = (path: string): AppPage => {
  if (path.startsWith('/check')) {
    return 'check';
  }
  if (path.startsWith('/result')) {
    return 'result';
  }
  return 'landing';
};

const pageToPath = (page: AppPage): string => {
  if (page === 'check') return '/check';
  if (page === 'result') return '/result';
  return '/';
};

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window === 'undefined') {
      return 'landing';
    }
    return pathToPage(window.location.pathname);
  });
  const [surveyFlowKey, setSurveyFlowKey] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handlePopState = () => {
      const page = pathToPage(window.location.pathname);
      if (page === 'result' && !surveyData) {
        setCurrentPage('landing');
        return;
      }
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [surveyData]);

  const navigate = (page: AppPage, options?: { resetSurvey?: boolean }) => {
    if (page === 'result' && !surveyData) {
      page = 'landing';
    }
    if (typeof window !== 'undefined') {
      const nextPath = pageToPath(page);
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setCurrentPage(page);

    if (page === 'check' && options?.resetSurvey) {
      setSurveyFlowKey((prev) => prev + 1);
    }
  };

  const handleSurveyComplete = (data: SurveyData) => {
    setSurveyData(data);
    navigate('result');
  };

  const handleRetake = () => {
    setSurveyData(null);
    navigate('check', { resetSurvey: true });
  };

  const handleBackHome = () => {
    navigate('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header
        onStartSurvey={() => navigate('check', { resetSurvey: currentPage !== 'check' })}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'landing' && (
          <LandingPage onStartSurvey={() => navigate('check', { resetSurvey: true })} />
        )}

        {currentPage === 'check' && (
          <SurveyPage key={surveyFlowKey} onComplete={handleSurveyComplete} />
        )}

        {currentPage === 'result' && surveyData && (
          <Results data={surveyData} onRestart={handleRetake} onBackHome={handleBackHome} />
        )}
      </main>
    </div>
  );
}

export default App;
