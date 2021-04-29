import React from "react";
import About from "./routes/About";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navigation from "./Components/Navigation";
import { HashRouter, Route } from "react-router-dom";
function App(){
    return (
    <HashRouter>
        <Navigation />
        <Route path="/" exact={true} component={Home} />
        <Route path="/About" component={About} />
        <Route path="/item-detail" component={Detail} />
    </HashRouter>
    )
}

export default App;