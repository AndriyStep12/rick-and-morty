import './home.css'
import React from 'react'
import { ReactDOM } from 'react'
import { Component } from 'react'
import logoText from '../images/logo.png'


export default function Home({refFocusCharacters, refFocusEpisodes, refFocusLocations, refFocusWatchList}){

    function scrollToCharacters(){
        refFocusCharacters.current.scrollIntoView({ behavior: 'smooth' })
    }

    function scrollToEpisodes(){
        refFocusEpisodes.current.scrollIntoView({ behavior: 'smooth' })
    }

    function scrollToLocations(){
        refFocusLocations.current.scrollIntoView({ behavior: 'smooth' })
    }

    function scrollToWatchList(){
        refFocusWatchList.current.scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <div className="blockHome">
            <div className="images"></div>
            <div className="blocky">
                <div className="boxHead">
                    <div className="boxHeadTitle">
                        <img src={logoText} className="boxImageLogo" alt="" />
                    </div>
                    <nav className="navSpan">
                        <span onClick={scrollToCharacters} className="text">Characters</span>
                        <span onClick={scrollToEpisodes} className="text">Episodes</span>
                        <span onClick={scrollToLocations} className="text">Locations</span>
                        <span onClick={scrollToWatchList} className="text">My Watch List</span>
                    </nav>
                </div>
                <div className="center">
                    <div className="centerText">
                        <p>Learn more about your<br />favorite cartoon</p>
                    </div>
                </div>
            </div>
        </div>
    )

}