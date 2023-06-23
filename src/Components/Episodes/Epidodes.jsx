import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import './episode.css'
import Block from "./block";
import Pagination from '@mui/material/Pagination';

function Epidodes({refFocusEpisodes}) {
  const [objEpisodes, setObjEpisodes] = useState({});
  const [arr, setArr] = useState([]);
  const [countPages, setCountPages] = useState(0);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [hasData, setHasData] = useState(true);
  const [rowColor, setRowColor] = useState("#333");

  function episodesFetch(pageNew) {
    fetch(`https://rickandmortyapi.com/api/episode/?name=${name}&page=${page}`)
      .then((response) => {
        if (response.status === 404) {
          setHasData(false);
          setObjEpisodes({});
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setObjEpisodes(data);
          setCountPages(data.info.pages);
          setHasData(true);
        }
      });
  }

  useEffect(() => {
    episodesFetch(page);
  }, [page, name]);

  useEffect(() => {
    if (objEpisodes.results) {
      setArr(objEpisodes.results);
    }
  }, [objEpisodes]);

  const paginationChange = (event, value) => {
    setPage(value);
    refFocusEpisodes.current.scrollIntoView({ behavior: 'smooth' });
  };

  const nameSet = (event) => {
    const value = event.target.value;
    setPage(1)
    if (value === null || value === '') {
      setName('');
    } else {
      setName(value);
    }
  };

  // Змінюємо кольори рядків через раз
  useEffect(() => {
    if (arr.length > 0) {
      const newColor = rowColor === "#222" ? "#000" : "#000";
      setRowColor(newColor);
    }
  }, [arr]);

  return (
    <div ref={refFocusEpisodes} className="episodeBlock">
      <p className="p_main">EPISODES</p>
      <div className="blockInfoEp">
        <input placeholder="Type name of episode" className="look" type="text" value={name} onChange={nameSet} />
        <table className="tableEpisode">
          {hasData ? (
            <tbody>
              <tr className="main_tr" style={{ backgroundColor: "#222" }}>
                <th style={{ width: '20%' }}>Episode</th>
                <th style={{ width: '60%' }}>Name</th>
                <th style={{ width: '20%' }}>Date</th>
              </tr>
              {arr.map((item, index) => (
                <Block
                  key={item.id}
                  name={item.name}
                  date={item.air_date}
                  episode={item.episode}
                  style={{ backgroundColor: index % 2 === 0 ? rowColor : "#222" }} // Застосовуємо стиль з кольором
                />
              ))}
            </tbody>
          ) : (
            <div className="blockEpisode">There is nothing to display</div>
          )}
        </table>
      </div>
      <div className="blockPag" id="blockPag">
        <Pagination
          count={countPages}
          page={page}
          shape="rounded"
          onChange={paginationChange}
        />
      </div>
    </div>
  );
}

export default Epidodes;
