import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import PrayerForms from './components/PrayerForms';

function App() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="App">
      <Header />
      <Hero onButtonClick={setActiveForm} />
      <PrayerForms activeForm={activeForm} onClose={() => setActiveForm(null)} />
    </div>
  );
}

export default App;