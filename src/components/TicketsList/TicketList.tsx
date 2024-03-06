import React from "react";
import Ticket from "../Ticket/Ticket";
import style from "./TicketList.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchKey } from "../store/api";
import { fetchTickets } from "../store/api";
import { ITicket } from "../../types";

function TicketList() {
  const dispatch = useAppDispatch();
  const {
    searchId,
    tickets,
    transferAll,
    transferOne,
    transferTwo,
    transferThree,
    transferNone,
    ticketsSort,
  } = useAppSelector((state) => state.sort);
  const [count, setCount] = useState<number>(5);

  const filteredArr = tickets.filter((item) => {
    if (transferAll) {
      return true;
    }

    if (
      transferOne &&
      item.segments[0].stops.length === 1 &&
      item.segments[1].stops.length === 1
    ) {
      return true;
    }
    if (
      transferTwo &&
      item.segments[0].stops.length === 2 &&
      item.segments[1].stops.length === 2
    ) {
      return true;
    }
    if (
      transferThree &&
      item.segments[0].stops.length === 3 &&
      item.segments[1].stops.length === 3
    ) {
      return true;
    }
    if (
      transferNone &&
      item.segments[0].stops.length === 0 &&
      item.segments[1].stops.length === 0
    ) {
      return true;
    }
  });

  useEffect(() => {
    dispatch(fetchKey());
  }, []);

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [searchId]);

  return (
    <div className={style.main}>
      {filteredArr
        .slice(0, count)
        .sort(function (a, b) {
          if (ticketsSort === "cheapest") {
            return a.price - b.price;
          }
          if (ticketsSort === "fastest") {
            return a.segments[0].duration - b.segments[0].duration;
          }
          if (ticketsSort === "optimal") {
            if (
              a.segments[0].duration &&
              b.segments[0].duration &&
              a.price &&
              b.price
            ) {
              return (
                a.segments[0].duration +
                a.price -
                (b.segments[0].duration + b.price)
              );
            }
            // Обработка случая, когда хотя бы одно из значений отсутствует или невалидно
            return 0;
          }
          // Обработка случая, когда ticketsSort не соответствует ни одному из условий
          return 0;
        })
        .map((item: ITicket) => {
          return <Ticket key={Math.random().toString(36).slice(2)} {...item} />;
        })}
      {filteredArr.length < 1 ? (
        <div className={style.noTickets}>
          Рейсов, подходящих под заданные фильтры, не найдено! ฅ•ω•ฅ
        </div>
      ) : (
        <button className={style.show_more} onClick={() => setCount(count + 5)}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
}

export default TicketList;
