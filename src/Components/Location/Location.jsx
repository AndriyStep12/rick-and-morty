import React, { useEffect, useState, useRef } from 'react';
import './location.css';
import { Autocomplete, Box, FormControl, Pagination, TextField } from '@mui/material';
import LocationBlock from './locationBlock';

export default function Location({refFocusLocations}) {
  const [arrResults, setArrResults] = useState([]);
  const [typeArr, setTypeArr] = useState([]);
  const [demArr, setDemArr] = useState([]);
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [nameLocations, setNameLocations] = useState([]);
  const [byName, setByName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');
  const [hasData, setHasData] = useState(true);
  const [rowColor, setRowColor] = useState("#333");

  function fetching(pageNew, name, type, dimension) {
    fetch(`https://rickandmortyapi.com/api/location?dimension=${dimension}&type=${type}&name=${name}&page=${pageNew}`)
    .then((response) => {
      if (response.status === 404) {
        setHasData(false);
      } else {
        setHasData(true)
        return response.json();
      }
    })
      .then((data) => {
        if (data){
          let array = [];
          data.results.map((item) => array.push(item.name));
          setNameLocations(array);
          setArrResults(data.results);
          setInfo(data.info);
          array = []
          data.results.map((item) => array.push(item.type));
          setTypeArr(Array.from(new Set(array)));
          array = [];
          data.results.map((item) => array.push(item.dimension));
          setDemArr(Array.from(new Set(array)));
        }
      });
  }


  useEffect(() => {
    fetching(page, byName, type, dimension);
  }, [page, byName, type, dimension]);

  useEffect(() => {
    setCountPage(info.pages);
  }, [info.pages]);

  const paginationChange = (event, value) => {
    setPage(value);
    refFocusLocations.current.scrollIntoView({ behavior: 'smooth' });
  };

  const nameSet = (event, value) => {
    setPage(1)
    if (value === null || value === '') {
      setByName('');
    } else {
      setByName(value);
    }
  };

  const typeSet = (event, value) => {
    setPage(1)
    if (value === null || value === '') {
      setType('');
    } else {
      setType(value);
    }
  };

  const demSet = (event, value) => {
    setPage(1);
    if (value === null || value === '') {
      setDimension('');
    } else {
      setDimension(value);
    }
  };
  
  useEffect(() => {
    if (arrResults.length > 0) {
      const newColor = rowColor === "#222" ? "#000" : "#000";
      setRowColor(newColor);
    }
  }, [arrResults]);


  return (
    <div ref={refFocusLocations} className="boxLocation">
      <p className="p_main">LOCATION</p>
      <div className="filterBlock">
      <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={nameLocations}
          value={byName}
          onChange={nameSet}
          onInputChange={(event, value) => setByName(value) & setPage(1)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Name" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={typeArr}
        value={type}
        onChange={typeSet}
        onInputChange={(event, value) => setType(value) & setPage(1)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={demArr}
        value={dimension}
        onChange={demSet}
        onInputChange={(event, value) => setDimension(value) & setPage(1)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Dimension" />}
      />
      </div>
      <div className="boxLocationInfo">
        <table className='tableLocation'>
          {hasData ? (<tbody><tr className='main_tr'><th className='firstTh'>Name</th><th className='secondTh'>Type</th><th className='thirdTh'>Dimension</th></tr>{arrResults.map((item, index)=><LocationBlock key={item} name={item.name} style={{ backgroundColor: index % 2 === 0 ? rowColor : "#222" }} dimension={item.dimension} type={item.type} />)}</tbody>): (<div className="blocking">There is nothing to display</div>)}
        </table>
      </div>
      <div className="boxLocationPag" id="boxLocationPag">
        <Pagination count={countPage} page={page} shape="rounded" color="secondary" onChange={paginationChange} />
      </div>
    </div>
  );
}
