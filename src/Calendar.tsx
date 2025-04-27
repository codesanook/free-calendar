import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
} from 'date-fns'

import { useState, MouseEvent } from 'react';
import { match, P } from 'ts-pattern';

const today = new Date();
const firstDayOfWeek = startOfWeek(today)
const dayNames = Array.from({ length: 7 }).map(
  (_, i) => format(addDays(firstDayOfWeek, i), 'E').toUpperCase()
);

const firstMonth = startOfYear(today)
const monthNames = Array.from({ length: 12 }).map(
  (_, i) => format(addMonths(firstMonth, i), 'MMM').toUpperCase()
);

export default function Calendar() {

  const [initialDate, setInitialDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(initialDate);
  const lastDayOfMonth = endOfMonth(initialDate);

  const daysInMonth = eachDayOfInterval(
    {
      start: firstDayOfMonth,
      end: lastDayOfMonth
    }
  );

  // index starts from 0 - 6
  const startDayIndex = getDay(firstDayOfMonth);
  const endDayIndex = getDay(lastDayOfMonth);

  const changeInitialDate = (monthIndex: number) => (_: MouseEvent<HTMLElement>) => {
    const diffIndex = monthIndex - getMonth(initialDate);

    const result = match(diffIndex)
      .with(0, () => initialDate)
      .with(P.number.lt(0), () => subMonths(initialDate, Math.abs(diffIndex)))
      .with(P.number.gt(0), () => addMonths(initialDate, diffIndex))
      .otherwise(() => { throw new Error(); });

    setInitialDate(result);
  }

  return (
    <div className='container'>
      <h1 className='calendar-title'>Free calendar - ปฎิทินแจกฟรี</h1>
      <div className='day-grid'>
        {dayNames.map((d, index) =>
          <div key={index} className='head'>{d}</div>
        )}
        {
          Array.from({ length: startDayIndex }).map((_, index) =>
            <div key={index}></div>
          )
        }

        {daysInMonth.map((day, index) =>
          <div key={index} className={(isToday(day) ? '_highlight' : '')}>{format(day, 'd')}</div>
        )}

        {
          Array.from({ length: 6 - endDayIndex }).map((_, index) =>
            <div key={index}></div>
          )
        }
      </div>

      <div className='months'>
        {monthNames.map((m, monthIndex) =>
          <div key={monthIndex} className={(getMonth(initialDate) == monthIndex ? '_highlight' : '')} onClick={changeInitialDate(monthIndex)}>
            {m}
          </div>
        )}
      </div>
    </div>
  )
}
