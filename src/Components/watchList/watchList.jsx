import React, { useState, useEffect } from "react";
import './watchList.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Block from "./block";

export default function WatchList({refFocusWatchList}) {
    const [array, setArray] = useState([]);
    const [namesArr, setNamesArr] = useState([]);
    const [savedEpisodes, setSavedEpisodes] = useState(JSON.parse(localStorage.getItem('saved_episodes')) || []);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode`)
            .then((response) => response.json())
            .then((data) => {
                const pages = data.info.pages;
                let currentPage = 2;
                let allResults = data.results;

                const fetchNextPage = () => {
                    if (currentPage <= pages) {
                        fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
                            .then((response) => response.json())
                            .then((result) => {
                                allResults = [...allResults, ...result.results];
                                currentPage++;
                                fetchNextPage();
                            });
                    } else {
                        setArray(allResults);
                        setNamesArr(allResults.map(item => item.name));
                    }
                };

                fetchNextPage();
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('saved_episodes', JSON.stringify(savedEpisodes));
    }, [savedEpisodes]);

    const handleChange = (event, newValue) => {
        setInputValue(newValue);
    };

    const handleAddEpisode = () => {
        const inArray = namesArr.includes(inputValue);
        const inSecondArray = savedEpisodes.some(item => item.name === inputValue);
        if (inArray && !inSecondArray) {
            let object = {
                name: inputValue,
                id: savedEpisodes.length,
                watched: false
            }
            setSavedEpisodes(prevEpisodes => [...prevEpisodes, object]);
            setInputValue('')
        }
        else if (inSecondArray){
            setInputValue('')
            alert('Sorry, but this episode is already in yor watch list')
        }
    };

    return (
        <div className="watchList-block" ref={refFocusWatchList}>
            <p className="p_main">Watch List</p>
            <div className="in_row">
                <Autocomplete
                    id="inputWatchList"
                    options={namesArr}
                    value={inputValue}
                    sx={{ width: 300 }}
                    onChange={handleChange}
                    onInputChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="Episodes" />}
                />
                <button className="button_add" onClick={handleAddEpisode}>Add episode</button>
            </div>
            <div className="list_blocks">
                {
                    savedEpisodes.length > 0 ? (savedEpisodes.map(item => <Block savedEpisodes={savedEpisodes} array={savedEpisodes} setArray={setSavedEpisodes} setSavedEpisodes={setSavedEpisodes} key={item} name={item.name} id={item.id} watched={item.watched} />)): <div>You don't have any episodes to watch later</div>
                }
            </div>
        </div>
    );
}
