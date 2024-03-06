import React from "react";
import style from "./App.module.scss";
import TransferList from "../TransferList/TransferList";
import TicketList from "../TicketsList/TicketList";
import FilterPanel from "../FilterPanel/FilterPanel";
import logo from "./logo.png";
import { useAppSelector } from "../store/hooks";
import { Spin } from "antd";

function App() {
  const { loading } = useAppSelector((state) => state.sort);

  return (
    <div className={style.wrapper}>
      <img src={logo} className={style.img} alt="logo" />
      <main className={style.main}>
        <TransferList />
        <div> 
          <FilterPanel />
          {loading ? <Spin size="large" className={style.spinner} /> : null}
          <TicketList />
        </div>
      </main>
    </div>
  );
}

export default App;
