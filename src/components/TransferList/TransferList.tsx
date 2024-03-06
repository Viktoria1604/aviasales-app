import React, { useState } from "react";
import style from "./TransferList.module.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setTicketFilter,
  setTicketTransferAll,
  setTicketTransferOne,
  setTicketTransferThree,
  setTicketTransferTwo,
  setTicketTransferNone,
} from "../store/Slice";
import { useEffect } from "react";

function TransferList() {
  const dispatch = useAppDispatch();
  const [a, setA] = useState<string[]>(['none']);
  const { transferAll, transferOne, transferTwo, transferThree, transferNone } =
    useAppSelector((state) => state.sort);

  const setStatus = (transfer: string) => {
    setA((prevState) => {
      //если два раза жмякаем "все"
      if (prevState.includes("all") && transfer === "all") {
        return [];
      }

      let updatedState: string[] = [];

      if (prevState.includes("all")) {
        updatedState.push("none", "one", "two", "three");
      } else {
        updatedState = [...prevState];
      }

      if (!updatedState.includes(transfer)) {
        updatedState.push(transfer);
      } else {
        updatedState = updatedState.filter((item) => item !== transfer);
      }

      return updatedState;
    });
  };

  useEffect(() => {
    const classAll =
      a.indexOf("all") !== -1 ||
      (a.indexOf("one") !== -1 &&
        a.indexOf("none") !== -1 &&
        a.indexOf("two") !== -1 &&
        a.indexOf("three") !== -1);
    const classNone = a.indexOf("none") !== -1 || a.indexOf("all") !== -1;
    const classOne = a.indexOf("one") !== -1 || a.indexOf("all") !== -1;
    const classTwo = a.indexOf("two") !== -1 || a.indexOf("all") !== -1;
    const classThree = a.indexOf("three") !== -1 || a.indexOf("all") !== -1;

    dispatch(setTicketTransferAll(classAll));
    dispatch(setTicketTransferNone(classNone));
    dispatch(setTicketTransferOne(classOne));
    dispatch(setTicketTransferTwo(classTwo));
    dispatch(setTicketTransferThree(classThree));
  }, [a]);

  return (
    <ul className={style.transferList}>
      <h3 className={style.header}>Количество пересадок</h3>
      <li>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="checkbox"
            className={style.checkbox}
            onChange={() => {
              dispatch(setTicketFilter("all"));
              setStatus("all");
            }}
          />
          <span
            className={transferAll ? style.inputchecked : style.input}
          ></span>

          <span className={style.input_text}>Все</span>
        </label>
      </li>
      <li>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="checkbox"
            className={style.checkbox}
            onChange={() => {
              dispatch(setTicketFilter("none"));
              setStatus("none");
            }}
          />
          <span
            className={transferNone ? style.inputchecked : style.input}
          ></span>
          <span className={style.input_text}>Без пересадок</span>
        </label>
      </li>
      <li>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="checkbox"
            className={style.checkbox}
            onChange={() => {
              dispatch(setTicketFilter("one"));
              setStatus("one");
            }}
          />
          <span
            className={transferOne ? style.inputchecked : style.input}
          ></span>
          <span className={style.input_text}>1 пересадка</span>
        </label>
      </li>
      <li>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="checkbox"
            className={style.checkbox}
            onChange={() => {
              dispatch(setTicketFilter("two"));
              setStatus("two");
            }}
          />
          <span
            className={transferTwo ? style.inputchecked : style.input}
          ></span>
          <span className={style.input_text}>2 пересадки</span>
        </label>
      </li>
      <li>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="checkbox"
            className={style.checkbox}
            onChange={() => {
              dispatch(setTicketFilter("three"));
              setStatus("three");
            }}
          />
          <span
            className={transferThree ? style.inputchecked : style.input}
          ></span>
          <span className={style.input_text}>3 пересадки</span>
        </label>
      </li>
    </ul>
  );
}

export default TransferList;
