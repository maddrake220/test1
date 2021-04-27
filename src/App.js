import React from "react";
import axios from "axios";
import Item from "./Item";

class App extends React.Component {
    state = {
        isLoading: true,
        items: []
        
    };
    getItems = async () => {
        const items
         = await axios.get("https://rest.dealink.co.kr/auction/group/2?page=0&size=3&sort=createdDate,desc")
        this.setState({items:items.data, isLoading:false})
        console.log(items.data)
        
    }
    componentDidMount() {
        this.getItems()
    }
    render() {
        const {isLoading, items} = this.state
        return <section class="container">
            {isLoading ? (<div class="loader"><span class="loader__text">"로딩중..."</span>
            </div>) : (
                items.map(item => {
            console.log(item)
            return <Item 
            productName={item.productName} 
            closingTime={item.closingTime} 
            description={item.description} />
        }))}</section>
    }
}

export default App