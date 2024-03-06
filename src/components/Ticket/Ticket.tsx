import React from "react";
import style from "./Ticket.module.scss";
import logo from "./S7 Logo.png";
import { useAppSelector } from "../store/hooks";
import { ITicket } from "../../types";
import {add, format} from 'date-fns'

interface ITicketProps extends ITicket{}

const Ticket = ({price, carrier, segments}:ITicketProps) => {

  const { tickets } = useAppSelector((state) => state.sort);
  
  function formatFlightTime(startTimeStr: string, durationInMinutes: number): string {
    const startTime = new Date(startTimeStr);
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

    const formattedStartTime = `${formatNumber(startTime.getHours())}:${formatNumber(startTime.getMinutes())}`;
    const formattedEndTime = `${formatNumber(endTime.getHours())}:${formatNumber(endTime.getMinutes())}`;

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  return (

    <div className={style.ticket}>
      <div className={style.header_wrapper}>
        <p className={style.price}>{price.toLocaleString("ru-RU")} ₽</p>
        <img src={`http://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </div>
      
      <div className={style.wrapper}>
     
      {segments.map((segment, index) => (
        <div className={style.text_container} key={index}>
        <div className={style.text_wrapper}>
          <p className={style.title}>{segment.origin} - {segment.destination}</p>
          <p className={style.details}>{formatFlightTime(segment.date, segment.duration)}</p>
        </div>
        <div className={style.text_wrapper}>
          <p className={style.title}>В пути</p>
          <p className={style.details}>{Math.floor(segment.duration/60) +"ч "+segment.duration%60+"м"} </p>
        </div>
        <div className={style.text_wrapper}>
          <p className={style.title}> {segment.stops.length<1? "прямой": segment.stops.length>1? segment.stops.length+' пересадки': '1 пересадка'}</p>
          <p className={style.details}>{segment.stops.length>0? segment.stops.join(", "):"-"}</p>
        </div>
        </div>
       
 
      ))}
    </div>
    </div>
   
  );
}

export default Ticket;


