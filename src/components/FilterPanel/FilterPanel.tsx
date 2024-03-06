import React from 'react';
import style from './FilterPanel.module.scss'
import { useAppDispatch,useAppSelector} from '../store/hooks';
import { setTicketSort } from '../store/Slice';

function FilterPanel() {
 const dispatch = useAppDispatch();
 const {ticketsSort} = useAppSelector(state => state.sort)


  return (
<ul className ={style.filterPanel}>
<label>
    <li className ={ticketsSort==='cheapest' ? style.filters_active : style.filters}>
      <button onClick={()=>dispatch(setTicketSort('cheapest'))}>Самый дешевый</button>
    </li>
    </label>
    <label>
    <li className ={ticketsSort==='fastest' ? style.filters_active : style.filters}><button onClick={()=>dispatch(setTicketSort('fastest'))}>Самый быстрый</button></li>
    </label>
    <label>
    <li className ={ticketsSort==='optimal' ? style.filters_active : style.filters}><button onClick={()=>dispatch(setTicketSort('optimal'))}>Оптимальный</button></li>
    </label>
</ul>
  );
}

export default FilterPanel;