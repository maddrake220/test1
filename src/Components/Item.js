
import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import './item.css';


function Item({id, year, title, summary, poster, date_uploaded, genres}) {
    
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    
    let interval = useRef()
    const starttimer = () => {
        const CountdownDate = new Date(date_uploaded).getTime();
  
        interval = setInterval(() =>{
            const now = new Date().getTime()
            const distance = now - CountdownDate 
  
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000* 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
            if(distance < 0) {
              clearInterval(interval.current);
            } else {
              setTimerDays(days)
              setTimerHours(hours)
              setTimerMinutes(minutes)
              setTimerSeconds(seconds)
            }
  
        }, 1000)
    };
  
    useEffect(() => {
      starttimer();
      return () => {
        clearInterval(interval.current)
      }
    }, ); 
    return (
      <Link to={{
        pathname: "/item-detail",
        state: {
          year,
          title,
          summary,
          poster,
          genres
        }
      }}>
        <div className="movie">
        <img src={poster} alt={title} title={title}/>
        <div className="movie__data">
            <h3 className="movie__title">{title}</h3>
            <h5 className="movie__year">{year}</h5>
            <p className="movie__summary">"{summary.slice(0,140)}..."</p>
            <ul className="movie__genres">{genres.map((genre, index) => (
                <li key={index} className="genres__genre">{genre}</li>))}</ul>
            <p>{timerDays}:{timerHours}:{timerMinutes}:{timerSeconds}</p>
        </div>
        </div>
    </Link>)
}

Item.propTypes = {
  id : propTypes.number.isRequired,
  year : propTypes.number.isRequired,
  title : propTypes.string.isRequired,
  summary : propTypes.string.isRequired,
  poster : propTypes.string.isRequired,
  genres : propTypes.arrayOf(propTypes.string).isRequired

}


export default Item