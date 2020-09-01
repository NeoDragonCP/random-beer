import React, { useState, useCallback } from "react";
import "./App.css"; /* Generic styling */
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

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
  //return `https://cors-anywhere.herokuapp.com/${url}`;
  return `https://thingproxy.freeboard.io/fetch/${url}`;
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

  const history = useHistory();

  const fetchBeerData = useCallback(async () => {
    setIsLoading(true);
    setErrorFetching(false); // reset any errors

    // First, get a random beer
    try {
      const reqRandom = await axios.get(
        appendURLWithCors(createStringForRandomBeer())
      );
      //console.log(reqRandom.data.data);

      const beerID = reqRandom.data.data.id;

      //console.log(reqRandom.data.data.breweries);
      setBrewery(reqRandom.data.data.breweries[0]);
      setCategory(reqRandom.data.data.style.category.name);

      // Get the full beer details using the ID
      const reqBeer = await axios.get(
        appendURLWithCors(createStringForBeerWithID(beerID))
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
    fetchBeerData();
  }

  function handleClickShowBrewery() {
    //history.push("/");
  }

  return (
    <Router history={history}>
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
            exact
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
                history={history}
              />
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
