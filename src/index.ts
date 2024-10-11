export interface OnHeaderCellAddedArgs {
  th: HTMLTableCellElement,
  day: string
}

export interface OnCellAddedArgs {
  td: HTMLTableCellElement,
  dateISOString: string
}

export interface OnDateClickedArgs {
  event: Event,
  dateISOString: string
}

export interface CalendarOptions {
  onHeaderCellAdded?: (arg: OnHeaderCellAddedArgs) => void,
  onCellAdded?: (arg: OnCellAddedArgs) => void,
  onDateClicked?: (arg: OnDateClickedArgs) => void,
  dayNames: [string, string, string, string, string, string, string],
  startDay?: string
}

export class Calendar {
  public year: number | undefined;

  public month: number | undefined;

  public element: HTMLElement;

  public options: CalendarOptions = {
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  constructor(el: HTMLElement) {
    this.element = el;
  }

  public render(year?: number, month?: number): void {
    if (this.element == null) {
      throw new Error('element is null');
    }
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const thr = document.createElement('tr');
    tableHead.appendChild(thr);

    const {
      dayNames, startDay, onHeaderCellAdded, onCellAdded, onDateClicked,
    } = this.options;
    let startDayIndex = 0;

    if (startDay) {
      startDayIndex = dayNames.indexOf(startDay);

      if (startDayIndex === -1) {
        throw new RangeError(`startDay [${startDay}] must be one of options.dayNames's values [${dayNames}].`);
      }
    }

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    const currentTime = date.getTime();

    if (year == null || month == null) {
      date.setDate(1);
    } else {
      date = new Date(year, month, 1);
    }

    this.year = date.getFullYear();
    this.month = date.getMonth();

    const firstDay = date.getDay();
    let firstDayOfMonth;

    const dayNamesWithDayNumber = dayNames
      .map((day: string, index: number) => ({ day, index }));

    for (let i = 0; i < startDayIndex; i++) {
      dayNamesWithDayNumber.push(dayNamesWithDayNumber.shift()!);
    }

    for (let i = 0; i < dayNamesWithDayNumber.length; i++) {
      const th = document.createElement('th');
      const d = dayNamesWithDayNumber[i];

      if (onHeaderCellAdded && typeof onHeaderCellAdded === 'function') {
        onHeaderCellAdded({ th, day: d.day });
      } else {
        th.appendChild(document.createTextNode(d.day));
      }

      thr.appendChild(th);

      if (firstDay === d.index) {
        firstDayOfMonth = i;
      }
    }

    const tableBody = document.createElement('tbody');

    // remove `closest` when ie11 support stops
    const closest = (elem: HTMLElement, s: string) => {
      if (!Element.prototype.matches) {
        Element.prototype.matches = (Element.prototype as any).msMatchesSelector
          || Element.prototype.webkitMatchesSelector;
      }

      let el: HTMLElement | Node | null = elem;
      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };

    if (onDateClicked && typeof onDateClicked === 'function') {
      const clickd = (e: Event) => {
        const el = !Element.prototype.closest
          ? closest((e.target as HTMLElement), '[data-date]')
          : (e.target as HTMLElement).closest('[data-date]');
        if (el) {
          onDateClicked({ event: e, dateISOString: (el as HTMLElement).dataset.date! });
        }
      };
      tableBody.addEventListener('click', clickd);
    }

    const lastDateOfMonth = new Date(this.year, this.month + 1, 0).getDate();
    let shouldContinue = false;
    let shouldPrintNextDay = false;
    let day = date.getDate();

    const padLeft = (num: number) => (num > 9 ? '' : '0') + num.toString();

    const appendCell = (td: HTMLTableCellElement, cellDate: Date) => {
      const dayOfMonth = cellDate.getDate();
      const isoDate = `${this.year}-${padLeft(this.month! + 1)}-${padLeft(dayOfMonth)}`;
      td.dataset.date = isoDate;
      if (currentTime === cellDate.getTime()) {
        td.classList.add('today');
      }

      if (onCellAdded && typeof onCellAdded === 'function') {
        onCellAdded({ td, dateISOString: isoDate });
      } else {
        td.appendChild(document.createTextNode(dayOfMonth.toString()));
      }
    };

    do {
      const tr = document.createElement('tr');

      for (let i = 0; i < 7; i++) {
        const td = document.createElement('td');

        if (shouldPrintNextDay) {
          day += 1;
          date.setDate(day);
          appendCell(td, date);
        } else if (firstDayOfMonth === i && day === 1) {
          shouldPrintNextDay = true;
          appendCell(td, date);
        }

        if (lastDateOfMonth === day) {
          shouldPrintNextDay = false;
        }

        tr.appendChild(td);
      }

      shouldContinue = lastDateOfMonth !== day;
      tableBody.appendChild(tr);
    } while (shouldContinue);

    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    table.appendChild(tableBody);
    this.element.appendChild(table);
  }
}
