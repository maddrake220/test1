
import React, {useEffect, useRef, useState} from "react";

function Item({productName, closingTime, closingDate, description}) {
    
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    
    let interval = useRef()
    const starttimer = () => {
        const CountdownDate = new Date(closingTime).getTime();
  
        interval = setInterval(() =>{
            const now = new Date().getTime()
            const distance = CountdownDate - now
  
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
    <div class="item">
        <h3 class="item__productName">제품명 : {productName}</h3>
        <p class="item__description">제품설명 : {description}</p>
        <h5 class="item__closingTime">상품 마감일:{closingTime}</h5>
        <p>남은 시간 : {timerDays}일{timerHours}시{timerMinutes}분{timerSeconds}초</p>
    </div>
    )
}
export default Item