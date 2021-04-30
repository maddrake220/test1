import React, { useState } from "react";
import axios from "axios";
import Item from "../Components/Item";
import "./Home.css";

class Home extends React.Component {
    state = {
        isLoading: true,
        items: []
        
    };
    handleClick = (items, e) => {
        /* Template Literals 사용법 */
        const sayHello = (name= "human") => `Hello ${name}`
        /* event handler에 인자 전달 법 */
        const yo = sayHello()
        console.log(items, yo)

        /* Object Destructuring */
        const human = {
            name : "Jon",
            lastName : "Snow",
            sex : "male",
            favFood : {
                breakfirst:"kimchi",
                lunch:"ramen",
                dinner:"sushi"
            }
        }
        const { name, lastName, sex : isgood, favFood:{breakfirst, dinner, lunch}} = human;
        console.log(name, lastName, isgood, breakfirst, lunch, dinner )

        /* Spread Operator 
           배열과 오브젝트 모두 사용 가능 */
        const days = ["Mon", "Tue", "Wed"]
        const otherDays = ["Thu", "Fri", "Sat"]

        const allDays = [...days, ...otherDays]
        console.log(allDays)

        /* Array Map : 
            day,index argument를 가지고 addSmile Function을 Call한다. */
        const days2 = ["Mon", "Tue", "Wed","Thu", "Fri"]
        //const addSmile = (day) => ` ٩꒰｡•◡•｡꒱۶ ${day}`
        //const smilingDays = days2.map(addSmile)
        const addSmile = ((day,index) => ` ${index+1} ٩꒰｡•◡•｡꒱۶ ${day}`)
        const smilingDays = days2.map(addSmile) 
        console.log(smilingDays)

        /* Array filter : 
            map과 유사하게 배열의 각 아이템에 Function 실행,
            차이점은 해당 아이템들을 보고 Function이 true이면 해당
            아이템을 배열에 넣는다.
        */
        const numbers = [2, 44, 33, 123, 455, 3434, 34, 36, 87, 6, 34, 3, 5, 1]

        const testCondition = (number)=> number > 15 
        const biggerThanfifteen = numbers.filter(testCondition)
        console.log(biggerThanfifteen)

        let posts = ["Hi", "Hello", "Bye"]
        const cencorship = (post) => post !== "Bye"
        posts = posts.filter(cencorship)
        console.log(posts)

        /* forEach push Include */
        let posts2 = ["Hi", "Hello", "Bye"]
        posts2.forEach(post => console.log(post))

        let greeting = ["Hi", "Hello", "Howdy", "Suup"]
        if(!greeting.includes("hello")){
            greeting.push("Hello")
        }
      }
    
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
                : ( <div>
                    <div>
                    <button onClick={(e) => this.handleClick(items, e)}>Delete Row</button>
                        
                    </div>
                    <div className="movies">
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
                </div></div>
                    )
        }</section>
        }
}
    

export default Home
