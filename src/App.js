import React, { useState, useCallback } from "react";
import "./App.css"; /* Generic styling */
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// * * *
// Pages
import BeerPage from "./components/pages/BeerPage";
import BreweryPage from "./components/pages/BreweryPage";

// * * *
// Custom components
import Header from "./components/Header";

// * * *

// Brewery API
const baseBreweryAPIURL = "http://api.brewerydb.com/v2/";
const apiKey = "a5c1b917e7ba62dcd79f434ed73bc72d";

// Helper Functions
function appendURLWithCors(url) {
  return `https://cors-anywhere.herokuapp.com/${url}`;
  //return `https://thingproxy.freeboard.io/fetch/${url}`;
  //return `http://alloworigin.com/get?url=${url}`;
}

function createStringForRandomBeer() {
  return `${baseBreweryAPIURL}/beer/random/?withBreweries=Y&hasLabels=Y&key=${apiKey}`;
}

function createStringForBeerWithID(id) {
  return `${baseBreweryAPIURL}/beer/${id}/?key=${apiKey}`;
}

function createStringForBreweryWithID(id) {
  return `${baseBreweryAPIURL}/brewery/${id}/?key=${apiKey}`;
}

// * * *

// Single beer call example
// http://api.brewerydb.com/v2/beer/jMQlvu/?key=a5c1b917e7ba62dcd79f434ed73bc72d
// pass beer ID then /?key={apikey}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);
  const [randomBeer, setRandomBeer] = useState([]);
  const [beerDescription, setBeerDescription] = useState("");
  const [brewery, setBrewery] = useState({});
  const [breweryPageData, setBreweryPageData] = useState({});
  const [category, setCategory] = useState("");

  const [beerID, setBeerID] = useState("");

  const fetchBeerWithID = useCallback(async (bID) => {
    try {
      // Get the full beer details using the ID
      const reqBeer = await axios.get(
        appendURLWithCors(createStringForBeerWithID(bID))
      );

      const data = reqBeer.data.data;
      setRandomBeer(data);
      setBeerDescription(data.description);
      //console.log(data); // log out the final request result
      setIsLoading(false);
    } catch (error) {
      setErrorFetching(true);
      setIsLoading(false);

      console.error(error);
    }
  }, []);

  const fetchRandomBeer = useCallback(async () => {
    setIsLoading(true);
    setErrorFetching(false); // reset any errors

    try {
      const reqRandom = await axios.get(
        appendURLWithCors(createStringForRandomBeer())
      );

      let localBeerID = reqRandom.data.data.id;
      setBeerID(localBeerID);
      setBrewery(reqRandom.data.data.breweries[0]);
      setCategory(reqRandom.data.data.style.category.name);

      fetchBeerWithID(localBeerID);
    } catch (error) {
      setErrorFetching(true);
      setIsLoading(false);

      console.error(error);
    }
  }, [fetchBeerWithID]);

  const fetchBeerData = useCallback(() => {
    if (beerID.length >= 2) {
      // specific
      fetchBeerWithID(beerID);
    } else {
      // random
      fetchRandomBeer();
    }
  }, [beerID, fetchRandomBeer, fetchBeerWithID]);

  const fetchBreweryData = useCallback(async () => {
    //setIsLoading(true);
    //setErrorFetching(false); // reset any errors

    try {
      const req = await axios.get(
        appendURLWithCors(createStringForBreweryWithID(brewery.id))
      );

      const data = req.data.data;

      setBreweryPageData(data);
      //console.log(data); // log out the final request result
      //setIsLoading(false);
    } catch (error) {
      setErrorFetching(true);
      setIsLoading(false);
      console.error(error);
    }
  }, [brewery.id]);

  function handleClickNewBeer() {
    // Get the random beer
    fetchRandomBeer();
  }

  function handleClickShowBrewery() {
    //history.push("/");
  }

  return (
    <Router>
      <div className="App">
        <Header>
          <h2>The Random Beer App</h2>
        </Header>
        <Switch>
          <Route
            path="/brewery"
            children={
              <BreweryPage
                brewery={breweryPageData}
                fetchCallback={fetchBreweryData}
              />
            }
          />
          <Route
            path="/"
            children={
              <BeerPage
                isLoading={isLoading}
                fetchCallback={fetchBeerData}
                beer={randomBeer}
                brewery={brewery}
                beerDescription={beerDescription}
                category={category}
                handleClickNewBeer={handleClickNewBeer}
                handleShowMoreInfo={handleClickShowBrewery}
                error={errorFetching}
              />
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
