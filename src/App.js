import './App.css';
import './adaptive.css'
import React, { useState, useRef } from 'react';
import Home from './Components/Home/Home';
import Characters from './Components/Characters/Characters';
import Locate from './Components/Location/Location';
import Epidodes from './Components/Episodes/Epidodes';
import WatchList from './Components/watchList/watchList';

function App() {
  const refFocusCharacters = useRef(null);
  const refFocusEpisodes = useRef(null);
  const refFocusLocations = useRef(null);
  const refFocusWatchList = useRef(null);

  return (
    <div className="App">
      <Home
        refFocusCharacters={refFocusCharacters}
        refFocusEpisodes={refFocusEpisodes}
        refFocusLocations={refFocusLocations}
        refFocusWatchList={refFocusWatchList}
      />
      <Characters
        refFocusCharacters={refFocusCharacters}
      />
      <Epidodes
        refFocusEpisodes={refFocusEpisodes}
      />
      <Locate
        refFocusLocations={refFocusLocations}
      />
      <WatchList
        refFocusWatchList={refFocusWatchList}
      />
    </div>
  );
}

export default App;
