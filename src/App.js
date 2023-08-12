import React, { useEffect, useState } from 'react';
import './App.css';
import Frame from './Components/Frame';
import IframeDisplay from './Components/Test';

function App() {
  const [data, setData] = useState([]);
  const [northEast, setNorthEast] = useState();
  const [northWest, setNorthWest] = useState();
  const [southEast, setSouthEast] = useState();
  const [southWest, setSouthWest] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNWFrameOpen, setNWFrameOpen] = useState(false);
  const [isNEFrameOpen, setNEFrameOpen] = useState(false);
  const [isSWFrameOpen, setSWFrameOpen] = useState(false);
  const [isSEFrameOpen, setSEFrameOpen] = useState(false);
  const [mlbData, setMlbData] = useState([]);
  const [nflData, setNflData] = useState([]);
  const [nhlData, setNhlData] = useState([]);
  const [nbaData, setNbaData] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(); 

  useEffect(() => {
    // Make the API call when the component mounts
    fetchData();
  }, [selectedLeague]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();

      if (utcHours === 0 && utcMinutes === 0) {
        // Run your function here
        generateData()
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const getApiUrl = (leagueSelected) => {
    
    return `https://api.the-odds-api.com/v4/sports/${leagueSelected}/scores/?apiKey=d457e15c66396990fbed1f0bde7e07bc`
  };

  const generateData = async () => {
    let mlbresponse = await fetch(getApiUrl("baseball_mlb"));
    let mlbdata = await mlbresponse.json();
    let nflresponse = await fetch(getApiUrl("americanfootball_nfl"));
    let nfldata = await nflresponse.json();
    let nbaresponse = await fetch(getApiUrl("basketball_nba"));
    let nbadata = await nbaresponse.json();
    let nhlresponse = await fetch(getApiUrl("icehockey_nhl"));
    let nhldata = await nhlresponse.json();
    setMlbData(mlbdata);
    setNflData(nfldata);
    setNbaData(nbadata);
    setNhlData(nhldata);
  }

  const fetchData = async () => {
    try {

    //   const data = [
    //     {
    //         "id": "8d7090b8623f57605a09bc8f16082827",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-02T22:40:00Z",
    //         "completed": false,
    //         "home_team": "Miami Marlins",
    //         "away_team": "Philadelphia Phillies",
    //         "scores": [
    //             {
    //                 "name": "Miami Marlins",
    //                 "score": "0"
    //             },
    //             {
    //                 "name": "Philadelphia Phillies",
    //                 "score": "2"
    //             }
    //         ],
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "cdfe416edf52b1de7c178a1870154fbf",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-02T23:05:00Z",
    //         "completed": false,
    //         "home_team": "New York Yankees",
    //         "away_team": "Tampa Bay Rays",
    //         "scores": [
    //             {
    //                 "name": "New York Yankees",
    //                 "score": "5"
    //             },
    //             {
    //                 "name": "Tampa Bay Rays",
    //                 "score": "2"
    //             }
    //         ],
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "3e4c118363c446be7235aa3f30598877",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-02T23:07:00Z",
    //         "completed": false,
    //         "home_team": "Toronto Blue Jays",
    //         "away_team": "Baltimore Orioles",
    //         "scores": [
    //             {
    //                 "name": "Toronto Blue Jays",
    //                 "score": "0"
    //             },
    //             {
    //                 "name": "Baltimore Orioles",
    //                 "score": "0"
    //             }
    //         ],
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "528fec19a9836d6b7108cbc431f699eb",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-02T23:45:00Z",
    //         "completed": false,
    //         "home_team": "St. Louis Cardinals",
    //         "away_team": "Minnesota Twins",
    //         "scores": [
    //             {
    //                 "name": "St. Louis Cardinals",
    //                 "score": "0"
    //             },
    //             {
    //                 "name": "Minnesota Twins",
    //                 "score": "0"
    //             }
    //         ],
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "cd36d76ed42a69a75a7ee5a9c2770b88",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T00:05:00Z",
    //         "completed": false,
    //         "home_team": "Chicago Cubs",
    //         "away_team": "Cincinnati Reds",
    //         "scores": [
    //             {
    //                 "name": "Chicago Cubs",
    //                 "score": "0"
    //             },
    //             {
    //                 "name": "Cincinnati Reds",
    //                 "score": "0"
    //             }
    //         ],
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "560e0d5da82bfcb357b44fec094d0323",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T00:05:00Z",
    //         "completed": false,
    //         "home_team": "Texas Rangers",
    //         "away_team": "Chicago White Sox",
    //         "scores": [
    //             {
    //                 "name": "Texas Rangers",
    //                 "score": "0"
    //             },
    //             {
    //                 "name": "Chicago White Sox",
    //                 "score": "0"
    //             }
    //         ],
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "ef6188872acabb58b78738c7bdf29fef",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T00:10:00Z",
    //         "completed": false,
    //         "home_team": "Kansas City Royals",
    //         "away_team": "New York Mets",
    //         "scores": null,
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "90bb01322e48e09ce7d9aa3761ea8ad0",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T01:45:00Z",
    //         "completed": false,
    //         "home_team": "San Francisco Giants",
    //         "away_team": "Arizona Diamondbacks",
    //         "scores": null,
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "56944e9512624693518db8b39c4d6b55",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T02:10:00Z",
    //         "completed": false,
    //         "home_team": "Los Angeles Dodgers",
    //         "away_team": "Oakland Athletics",
    //         "scores": null,
    //         "last_update": "2023-08-03T00:06:13Z"
    //     },
    //     {
    //         "id": "b23881dcc585788f90f31f2f3e1d3240",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T16:10:00Z",
    //         "completed": false,
    //         "home_team": "Miami Marlins",
    //         "away_team": "Philadelphia Phillies",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "cc66d06248f55e17419b7e0978847615",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T18:05:00Z",
    //         "completed": false,
    //         "home_team": "Texas Rangers",
    //         "away_team": "Chicago White Sox",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "dc45872f44a55565a653bb47bef52f58",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T19:07:00Z",
    //         "completed": false,
    //         "home_team": "Toronto Blue Jays",
    //         "away_team": "Baltimore Orioles",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "5ff152c839ca46eda8644a041e239e46",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T23:15:00Z",
    //         "completed": false,
    //         "home_team": "New York Yankees",
    //         "away_team": "Houston Astros",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "db88b8ec480847f64426531278b8e00e",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T23:15:00Z",
    //         "completed": false,
    //         "home_team": "Milwaukee Brewers",
    //         "away_team": "Pittsburgh Pirates",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "0a9ce8e118c81ff73074175522187856",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-03T23:45:00Z",
    //         "completed": false,
    //         "home_team": "St. Louis Cardinals",
    //         "away_team": "Minnesota Twins",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "e13f6de598e5bb7fe45f7deb041c5911",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-04T00:05:00Z",
    //         "completed": false,
    //         "home_team": "Chicago Cubs",
    //         "away_team": "Cincinnati Reds",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "caa0253b8cdb15caad2eb8a6eb0d9a7e",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-04T01:38:00Z",
    //         "completed": false,
    //         "home_team": "Los Angeles Angels",
    //         "away_team": "Seattle Mariners",
    //         "scores": null,
    //         "last_update": null
    //     },
    //     {
    //         "id": "dae6c1818d4b8bffb9a9f7a86318b965",
    //         "sport_key": "baseball_mlb",
    //         "sport_title": "MLB",
    //         "commence_time": "2023-08-04T02:10:00Z",
    //         "completed": false,
    //         "home_team": "Los Angeles Dodgers",
    //         "away_team": "Oakland Athletics",
    //         "scores": null,
    //         "last_update": null
    //     }
    // ]

      switch(selectedLeague) {
        case "baseball_mlb":
          setData(mlbData)
          break;
        case "americanfootball_nfl":
          setData(nflData);
          break;
        case "basketball_nba":
          setData(nbaData)
          break;
        case "ice_hockey":
          setData(nhlData);
          break;
        default:
          break;
      }

    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setGame = (frameID, url) => {
    if (frameID === "NW") {
      setNorthWest(url);
    } else if (frameID === "NE") {
      setNorthEast(url);
    } else if (frameID === "SW") {
      setSouthWest(url);
    } else if (frameID === "SE") {
      setSouthEast(url);
    } else {
      console.log("INVALID");
    }
  };

  const handleGameClick = (frameID, url) => {
    setGame(frameID, url);
  };
  
  function formattedString(inputString) {
    // Convert to lowercase
    if (inputString) {
      let formattedString = inputString.toLowerCase();
    
      // Replace spaces with hyphens
      formattedString = formattedString.replace(/ /g, '-');
      
      // Remove special characters and keep only alphanumeric characters and hyphens
      formattedString = formattedString.replace(/[^a-z0-9-]/g, '');
    
      return formattedString;
    }
    return '';
  };

  const handleHover = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleFrameHover = (frame) => {
    switch (frame) {
      case "NW":
        setNWFrameOpen(!isNWFrameOpen);
        break;
      case "NE":
        setNEFrameOpen(!isNEFrameOpen);
        break;
      case "SW":
        setSWFrameOpen(!isSWFrameOpen);
        break;
      case "SE":
        setSEFrameOpen(!isSEFrameOpen);
        break;
      default:
        break;
    }
  };

  const frameRefresh = (frame) => {
    let temp;
    let temp1;
    let temp2;
    let temp3;
    switch (frame) {
      case "NW":
        temp = northWest;
        setNorthWest('https://embedstream.me/');
        setTimeout(() => {
          setNorthWest(temp);
        }, 2000);
        
        break;
      case "NE":
        temp = northEast;
        setNorthEast('https://embedstream.me/');
        setTimeout(() => {
          setNorthEast(temp);
        }, 2000);
        break;
      case "SW":
        temp = southWest;
        setSouthWest('https://embedstream.me/');
        setTimeout(() => {
          setSouthWest(temp);
        }, 2000);
        break;
      case "SE":
        temp = southEast;
        setSouthEast('https://embedstream.me/');
        setTimeout(() => {
          setSouthEast(temp);
        }, 2000);
        break;
      case "ALL":
        temp = southEast;
        temp1 = southWest;
        temp2 = northEast;
        temp3 = northWest;
        setSouthEast('https://embedstream.me/');
        setSouthWest('https://embedstream.me/');
        setNorthEast('https://embedstream.me/');
        setNorthWest('https://embedstream.me/');
        setTimeout(() => {
          setSouthEast(temp);
          setSouthWest(temp1);
          setNorthEast(temp2);
          setNorthWest(temp3);
        }, 2000);

        break;
      default:
        break;
    }
  };

  const formattedDate = (inputDate) => {

    // Convert the string to a Date object
    var dateObject = new Date(inputDate);

    // Convert UTC time to EST (UTC-5)
    //var estOffset = -1 * 60; // Offset in minutes
    var estTime = new Date(dateObject.getTime() - 1 + 60 * 1000);

    // Extract month and day
    var month = (estTime.getMonth() + 1).toString();
    var day = estTime.getDate().toString();
    var monthDay = month + '/' + day;

    // Extract hour and minute
    var hours = estTime.getHours();
    var minutes = estTime.getMinutes();

    // Convert to 12-hour format and determine AM/PM
    var period = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12; // Handle midnight (0) and noon (12)
    var hourMinute = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;

    // Combine the formatted values
    var formattedDate = monthDay + ' ' + hourMinute;

    // Print the result
    return formattedDate;

  };

  const selectLeage = async (league) => {
    setSelectedLeague(league);
    await fetchData()
  };

  const backToMenu = () => {
    setNWFrameOpen(false);
    setNEFrameOpen(false);
    setSWFrameOpen(false);
    setSEFrameOpen(false);
    setMenuOpen(true);
  }
  
  return (
    <div className="App">
      {/* <div id="NW">
        <Frame src={northWest} />   
      </div>
      <div id="NE">
        <Frame src={northEast} />
      </div>

      <div id="SW">
        <Frame src={southWest} />
      </div>
      <div id="SE">
        <Frame src={southEast}/>
      </div> */}
      <IframeDisplay/>
      {/* <div className="hidden-side-menu">
        <div className="invisible-side-button" onClick={handleHover} >
            &lt;
        </div> 
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className='menu-container'>
            <li className='mb-5'>
              <button onClick={() => generateData()}>GENERATE</button>
              <button onClick={() => selectLeage("baseball_mlb")} 
              className={`league-button ${selectedLeague === "baseball_mlb" ? 'lg-open' : ''}`}>
                <img src='https://res.cloudinary.com/mattreiley/image/upload/h_65,q_70,w_65/v1676447821/Pnyx/Teams/MLB.png' alt='MLB'/></button>
              <button onClick={() => selectLeage("americanfootball_nfl")}
               className={`league-button ${selectedLeague === "americanfootball_nfl" ? 'lg-open' : ''}`}>
                <img src='https://res.cloudinary.com/mattreiley/image/upload/h_65,q_70,w_65/v1676447821/Pnyx/Teams/NFL.png' alt='NFL'/></button>
              <button onClick={() => selectLeage("basketball_nba")} 
               className={`league-button ${selectedLeague === "basketball_nba" ? 'lg-open' : ''}`}>
                <img src='https://res.cloudinary.com/mattreiley/image/upload/h_65,q_70,w_65/v1691189114/Pnyx/Teams/NBA.png' alt='NBA'/>
               </button>
              <button onClick={() => selectLeage("icehockey_nhl")} 
              className={`league-button ${selectedLeague === "icehockey_nhl" ? 'lg-open' : ''}`}>
                <img src='https://res.cloudinary.com/mattreiley/image/upload/h_65,q_70,w_65/v1676447821/Pnyx/Teams/NHL.png' alt='NHL'/></button>      
            </li>
            <li className='northwest'>
              <button className='cool-button d-1 d-1-nw' onClick={() => handleFrameHover("NW")}>North West </button>
              <button onClick={() => frameRefresh("NW")} className='refresh' ><span>Refresh</span><i></i></button>
              <div className={`menu ${isNWFrameOpen ? 'open' : ''}`}>
                <ul className='ml-4'>
                <li><span onClick={() => backToMenu()}
                 className='back'>&lt;=BACK</span><span className='header'>NorthWest</span></li>
                  {data.map((game) => (
                    <li if id='team' key={game.id} onClick={() =>
                      handleGameClick("NW", 
                      `https://embedstream.me/${formattedString(game.home_team)}-vs-${formattedString(game.away_team)}-stream-1`)
                    }>              
                  <img alt={game.home_team} className='img-home' src={`https://res.cloudinary.com/mattreiley/image/upload/h_65,q_70,w_65/v1691106118/Pnyx/Teams/${selectedLeague}/${game.home_team}.png`} />
                    <span className='vs'>VS</span> 
                    <img alt={game.away_team} className='img-away' src={`https://res.cloudinary.com/mattreiley/image/upload/h_65,q_70,w_65/v1691106118/Pnyx/Teams/${selectedLeague}/${game.away_team}.png`} />
                      {game.scores !== null && game.completed ===false ? (
                        <span className='isLive'>  LIVE</span>
                      ) : null}
                      {game.scores !== null && game.completed === false ? (
                        <li className='score-container'><span className='home-score'>{game.scores[0].score} </span>
                        <span className='away-score'>{game.scores[1].score} </span>
                        </li>
                      ) : null}                      
                      <li>{formattedDate(game.commence_time)} PST</li>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className='northeast'>
            <button className='cool-button d-1 d-1-ne' onClick={() => handleFrameHover("NE")}>North East</button>
              <button onClick={() => frameRefresh("NE")} className='refresh' ><span>Refresh</span><i></i></button>
              <div  className={`menu ${isNEFrameOpen ? 'open' : ''}`}>
                <ul className='ml-4'>
                <li><span onClick={() => backToMenu()}
                 className='back'>&lt;=BACK</span><span className='header'>NorthEast</span></li>
                  {data.map((game) => (                   
                    <li if id='team' key={game.id} onClick={() =>
                      handleGameClick("NE", `https://embedstream.me/${formattedString(game.home_team)}-vs-${formattedString(game.away_team)}-stream-1`)
                    }>
                      <img className='img-home' src={`https://res.cloudinary.com/mattreiley/image/upload/c_scale,h_65,q_70,w_65/v1691106118/Pnyx/Teams/mlb/${game.home_team}.png`} />
                    <span className='vs'>VS</span> 
                    <img className='img-away' src={`https://res.cloudinary.com/mattreiley/image/upload/c_scale,h_65,q_70,w_65/v1691106118/Pnyx/Teams/mlb/${game.away_team}.png`} />
                      {game.scores !== null && game.completed ===false ? (
                        <span className='isLive'>  LIVE</span>
                      ) : null}
                      {game.scores !== null && game.completed ===false ? (
                        <li className='score-container'><span className='home-score'>{game.scores[0].score} </span>
                        <span className='away-score'>{game.scores[1].score} </span>
                        </li>
                      ) : null}                    
                      <li>{formattedDate(game.commence_time)} PST</li>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className='southwest' onClick={() => handleFrameHover("SW")}>
            <button className='cool-button d-1 d-1-sw' onClick={() => handleFrameHover("SW")}>South West</button>
            <button onClick={() => frameRefresh("SW")} className='refresh' ><span>Refresh</span><i></i></button>
            <div  className={`menu ${isSWFrameOpen ? 'open' : ''}`}>
                <ul className='ml-4'>
                <li><span onClick={() => backToMenu()}
                 className='back'>&lt;=BACK</span><span className='header'>SouthWest</span></li>
                  {data.map((game) => (                   
                    <li if id='team' key={game.id} onClick={() =>
                      handleGameClick("SW", `https://embedstream.me/${formattedString(game.home_team)}-vs-${formattedString(game.away_team)}-stream-1`)
                    }>
                      <img className='img-home' src={`https://res.cloudinary.com/mattreiley/image/upload/c_scale,h_65,q_70,w_65/v1691106118/Pnyx/Teams/mlb/${game.home_team}.png`} />
                    <span className='vs'>VS</span> 
                    <img className='img-away' src={`https://res.cloudinary.com/mattreiley/image/upload/c_scale,h_65,q_70,w_65/v1691106118/Pnyx/Teams/mlb/${game.away_team}.png`} />
                      {game.scores !== null && game.completed ===false ? (
                        <span className='isLive'>  LIVE</span>
                      ) : null}
                      {game.scores !== null && game.completed ===false ? (
                        <li className='score-container'><span className='home-score'>{game.scores[0].score} </span>
                        <span className='away-score'>{game.scores[1].score} </span>
                        </li>
                      ) : null}                     
                      <li>{formattedDate(game.commence_time)} PST</li>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className='southeast' onClick={() => handleFrameHover("SE")}>
            <button className='cool-button d-1 d-1-se' onClick={() => handleFrameHover("SE")}>South East</button>
            <button onClick={() => frameRefresh("SE")} className='refresh' ><span>Refresh</span><i></i></button>
              <div onClick={() => handleFrameHover("SE")} className={`menu ${isSEFrameOpen ? 'open' : ''}`}>
                <ul className='ml-4'>
                <li><span onClick={() => backToMenu()}
                 className='back'>&lt;=BACK</span><span className='header'>SouthEast</span></li>
                {data.map((game) => (   
                    <li if id='team' key={game.id} onClick={() =>
                      handleGameClick("SE", `https://embedstream.me/${formattedString(game.home_team)}-vs-${formattedString(game.away_team)}-stream-1`)
                    }>
                      <img className='img-home' src={`https://res.cloudinary.com/mattreiley/image/upload/c_scale,h_65,q_70,w_65/v1691106118/Pnyx/Teams/mlb/${game.home_team}.png`} />
                    <span className='vs'>VS</span> 
                    <img className='img-away' src={`https://res.cloudinary.com/mattreiley/image/upload/c_scale,h_65,q_70,w_65/v1691106118/Pnyx/Teams/mlb/${game.away_team}.png`} />
                      {game.scores !== null && game.completed ===false ? (
                        <span className='isLive'>  LIVE</span>
                      ) : null}
                      {game.scores !== null && game.completed ===false ? (
                        <li className='score-container'><span className='home-score'>{game.scores[0].score} </span>
                        <span className='away-score'>{game.scores[1].score} </span>
                        </li>
                      ) : null}                     
                      <li>{formattedDate(game.commence_time)} PST</li>
                    </li>
                  ))}                                
                </ul>
              </div>
            </li>
          </ul>
          <button onClick={() => frameRefresh("ALL")} className='refresh' ><span>Refresh ALL Frames</span><i></i></button>
        </div>
      </div> */}
    </div>
  );
}

export default App;

