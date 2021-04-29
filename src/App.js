import React from "react";
import axios from "axios";
import Item from "./Item";
import "./App.css";

class App extends React.Component {
    state = {
        isLoading: true,
        items: []
        
    };
    getItems = async () => {
        const {data: {data: {movies}}} 
        = await axios.get("https://yts.mx/api/v2/list_movies.json")
        this.setState({items:movies, isLoading:false})
        console.log(movies)
        
    }
    componentDidMount() {
        this.getItems()
    }
    render() {
    const {isLoading, items} = this.state
    return <section class="container">
        {
            isLoading
                ? (
                    <div class="loader">
                        <span class="loader__text">"로딩중..."</span>
                    </div>
                )
                : ( <div className="movies">
                    {items.map(item => (
                     <Item
                        id={item.id}
                        year={item.year}
                        title={item.title}
                        summary={item.summary}
                        poster={item.medium_cover_image}
                        date_uploaded={item.date_uploaded}
                        genres={item.genres}
                        />
                ))}
                </div>
                    )
        }</section>
}
}

export default App
