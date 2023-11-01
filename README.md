# 📅 Calendar
[![Coverage Status](https://coveralls.io/repos/github/jpvmrcd/calendar/badge.svg?branch=main)](https://coveralls.io/github/jpvmrcd/calendar?branch=main)

A lightweight JavaScript library for generating simple HTML table calendar.
<table>
  <thead>
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
    </tr>
    <tr>
      <td>6</td>
      <td>7</td>
      <td>8</td>
      <td>9</td>
      <td>10</td>
      <td>11</td>
      <td>12</td>
    </tr>
    <tr>
      <td>13</td>
      <td>14</td>
      <td>15</td>
      <td>16</td>
      <td>17</td>
      <td>18</td>
      <td>19</td>
    </tr>
    <tr>
      <td>20</td>
      <td>21</td>
      <td>22</td>
      <td>23</td>
      <td>24</td>
      <td>25</td>
      <td>26</td>
    </tr>
    <tr>
      <td>27</td>
      <td>28</td>
      <td>29</td>
      <td>30</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

&nbsp;

## Usage

Using npm:
```console
npm install @jpvmrcd/calendar --save
```
```html
<div id="calendar"></div>
```
```typescript
import { Calendar } from '@jpvmrcd/calendar';

const cal = new Calendar(document.getElementById('calendar'));
cal.render();
```

using CDN:
```html
<div id="calendar"></div>

<script src="https://unpkg.com/@jpvmrcd/calendar/dist/calendar.min.js"></script>
```

```javascript
var cal = new jpvmrcd.calendar.Calendar(document.getElementById('calendar'));
cal.render();
```

&nbsp;

## Methods
### `render(year?: number, month?: number): Date`
Generates a calendar based on year and month arguments. If no arguments are passed, the calendar renders the current month and year.

#### Parameters
| Name | Type | Description |
|-|-|-|
| year | `number` | A number corresponding the year to be rendered. |
| month | `number` | A zero based number corresponding the month to be rendered (zero is first month). |

&nbsp;

## Properties
| Name | Type | Description |
|-|-|-|
| options | [calendarOptions](#calendarOptions) | The rendering options for the calendar. |
| month | `number` | The zero based month of the rendered calendar. |
| year | `number` | The full year of the rendered calendar. |
| element | `HTMLElement` | The parent HTML element of the calendar. |

&nbsp;

## Types

### `calendarOptions`

| Name | Type | Description |
|-|-|-|
| dayNames | `string[7]` | Sets the days of the week. Should start from Sunday. |
| startDay | `string` | Sets the start day of the week. The value for `startDay` should match one of the values defined in `dayNames`. Defaults to `Sun`. |
| onCellAdded | (args: [onCellAddedArgs](#onCellAddedArgs)) => void | Event triggered on every calendar cell added to the calendar. |
| onDateClicked | (args: [onDateClickedArgs](#onDateClickedArgs)) => void | Event triggered on every calendar date cell click. |

### `onCellAddedArgs`
| Name | Type | Description |
|-|-|-|
| td | `HTMLTableCellElement` | Current `td` being rendered. |
| dateISOString | `string` | ISO formatted date of the cell being rendered. |

### `onDateClickedArgs`
| Name | Type | Description |
|-|-|-|
| event | `Event` | The `Event` triggered. |
| dateISOString | `string` | ISO formatted date of cell clicked. |

&nbsp;

## Examples
### Render calendar for the current month year.
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.render();
```

### Calendar properties and `render()` return value
```typescript
const cal = new Calendar(document.getElementById('calendar'));
const date = cal.render(2021, 0);

console.log(cal.month);
> 0

console.log(cal.year);
> 2021

console.log(cal.element);
> <div id="calendar">...</div>
```

### Render calendar with custom `option.dayNames`
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.options.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
cal.render();
```

### Render calendar with `options.startDay`
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.options.startDay = 'Mon';
cal.render();
```

### Render calendar with `option.dayNames` and `option.startDay`
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.options.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
cal.options.startDay = 'Tu';
cal.render();
```

### Change rendered calendar
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.render(2021, 0);

// renders calendar for December 2020
cal.render(cal.year, cal.month + 1);

// renders calendar for January 2021
cal.render(cal.year, cal.month - 1);
```

### Render calendar with customized cells using `options.onCellAdded`
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.options.onCellAdded = (args: OnCellAddedArgs) => {
  args.td.innerHTML = `<div>${args.cellDate.getDate()}</div>`;
};
cal.render();
```


### Render calendar with `options.OnDateClicked`
```typescript
const cal = new Calendar(document.getElementById('calendar'));
cal.options.onDateClicked = (args: OnDateClickedArgs) => {
  console.log(args);
  // > {event: MouseEvent, dateISOString: "YYYY-MM-DD"}
};
cal.render();
```
