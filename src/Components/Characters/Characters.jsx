import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './characters.css'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useRef } from "react";
import Character from "./Character/Character";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Characters({refFocusCharacters}) {
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');
    const [gender, setGender] = useState('');
    const [page, setPage] = useState(1);
    const [thisPage, setThisPage] = useState(1);
    const [characterData, setCharacterData] = useState([]);

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

    const handleChangeSp = (event: SelectChangeEvent) => {
        setSpecies(event.target.value);
    };

    const handleChangeGen = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };

    function updateFunc(pag) {
        fetch(`https://rickandmortyapi.com/api/character?status=${status}&gender=${gender}&species=${species}&page=${pag}`)
            .then((response) => response.json())
            .then((data) => {
                setCharacterData(data.results);
                setPage(data.info.pages);
                setThisPage(pag);
            });
    }

    useEffect(() => {
        updateFunc(1);
    }, [status, species, gender]);

    const paginationChange = (event, value) => {
        updateFunc(value);
        refFocusCharacters.current.scrollIntoView({ behavior: 'smooth' });
    };

    console.log(characterData)

    return (
        <div className="characters_page" ref={refFocusCharacters}>
            <p style={{ marginBottom: '30px' }} className="p_main">CHARACTERS</p>
            <Box sx={{ width: '100%' }}> 
                <Box sx={{ minWidth: 120 }}>
                    <div className="divs">
                        <FormControl sx={{ width: '200px' }}>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status-select"
                                value={status}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="alive">Alive</MenuItem>
                                <MenuItem value="dead">Dead</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '200px' }}>
                            <InputLabel id="species-label">Species</InputLabel>
                            <Select
                                labelId="species-label"
                                id="species-select"
                                value={species}
                                label="Species"
                                onChange={handleChangeSp}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="human">Human</MenuItem>
                                <MenuItem value="alien">Alien</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '200px' }}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender-select"
                                value={gender}
                                label="Gender"
                                onChange={handleChangeGen}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="genderless">Genderless</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
                <Grid container spacing={2}>
                    {characterData.map((character) => <Character key={character} origin={character.origin.name} id={character.id} image={character.image} name={character.name} gender={character.gender} species={character.species} status={character.status} locationname={character.location.name} />)}
                </Grid>
                <Pagination
                    count={page}
                    page={thisPage}
                    onChange={paginationChange}
                    style={{ marginTop: '20px' }}
                    shape="rounded"
                />
            </Box>
        </div>
    );
}
