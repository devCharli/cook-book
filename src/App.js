import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Search from "./pages/Search";
import Recipe from "./pages/Recipe";
import Edit from "./pages/Edit";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/search" component={Search} />
          <Route path="/recipe/:id" component={Recipe} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
