import { Calendar, OnCellAddedArgs, OnHeaderCellAddedArgs } from '../src/index';

test('null element should throw error', () => {
  expect(() => new Calendar(null).render()).toThrow('element is null');
});

test('render without args should render current calendar', () => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('12 May 2021 00:00:00 UTC'));

  const calendar = new Calendar(document.createElement('div'));
  calendar.render();
  expect(calendar.element.outerHTML).toMatchSnapshot();

  jest.useRealTimers();
});

test('render January 1900 should render correct calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.render(1900, 0);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('render December 2200 should render correct calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.render(2200, 11);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.dayNames should reflect on calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay that does not match any dayNames should throw an error', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Sunday';

  expect(() => calendar.render(2021, 5)).toThrow('startDay [Sunday] must be one of options.dayNames\'s values [Sun,Mon,Tue,Wed,Thu,Fri,Sat].');
});

test('setting options.startDay to Mon should render a calendar that starts on a Monday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Mon';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay to Tue should render a calendar that starts on a Tuesday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Tue';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay to Wed should render a calendar that starts on a Wednesday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Wed';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay to Thu should render a calendar that starts on a Thursday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Thu';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay to Fri should render a calendar that starts on a Friday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Fri';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay to Sat should render a calendar that starts on a Saturday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Sat';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting options.startDay to Sun should render a calendar that starts on a Sunday', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.startDay = 'Sun';
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('calling render again should update the calendar rendered', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.render(2021, 5);
  calendar.render(2021, 6);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('calling onHeaderCellAdded to update rendered cell should reflect on actual rendered calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.onHeaderCellAdded = (arg: OnHeaderCellAddedArgs) => {
    arg.th.innerHTML = `<div>${arg.day}</div>`;
  };
  calendar.render(2024, 10);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting onHeaderCellAdded to invalid type should render default calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.onHeaderCellAdded = 'test' as any;
  calendar.render(2024, 10);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('calling onCellAdded to update rendered cell should reflect on actual rendered calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.onCellAdded = (arg: OnCellAddedArgs) => {
    arg.td.innerHTML = `<div>${+arg.dateISOString.substring(8, 10)}</div>`;
  };
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting onCellAdded to invalid type should render default calendar', () => {
  const calendar = new Calendar(document.createElement('div'));
  calendar.options.onCellAdded = 'test' as any;
  calendar.render(2021, 5);

  expect(calendar.element.outerHTML).toMatchSnapshot();
});

test('setting onDateClicked with a valid function should attach a click event to td with date', () => {
  const calendar = new Calendar(document.createElement('div'));
  const mockCallback = jest.fn((x) => x);
  calendar.options.onDateClicked = mockCallback;
  calendar.render(2021, 5);
  (calendar.element.querySelector('td[data-date="2021-06-01"]') as any).click();

  expect(mockCallback.mock.calls.length).toBe(1);
});
