import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();
  const newDate = new Date();
  const currentMonthNum: number = newDate.getMonth();
  const currentMonthStr: string = datepicker.monthNames[newDate.getMonth()];
  const prevMonthStr: string = datepicker.monthNames[currentMonthNum === 0 ? 11 : currentMonthNum - 1];
  const currentYearNum: number = newDate.getFullYear();
  const currentYearStr: string = currentYearNum.toString();
  const prevYearStr: string = (currentYearNum - 1).toString();
  const nextMonthStr: string = datepicker.monthNames[(currentMonthNum + 1)];
  const nextYearStr: string = (currentYearNum + 1).toString();
  const currentDay: number = newDate.getDate();
  const daySevenAfterCurrent = new Date();
  daySevenAfterCurrent.setDate(newDate.getDate() + 7);

  beforeEach(() => datepicker.navigateTo());

  describe('Initial state', () => {
    const initialState = datepicker.exampleDemosArr.initialState;

    beforeEach(() => datepicker.scrollToMenu('Initial state'));

    it(`example contains 2 inputs, 2 buttons Datepicker and Daterangepicker, value in Datepicker input is current day,
                   value in Daterangepicker input is interval from current day to current + 7 days`, () => {
      datepicker.isInputHaveAttrs(initialState, [{attr: 'type', value: 'text'}], 0);
      datepicker.isButtonExist(initialState, 'Date Picker', 0);
      datepicker.isButtonExist(initialState, 'Date Range Picker', 1);
      datepicker.isInputValueEqual(initialState, `${newDate.toLocaleDateString('en-US')}`, 0);
      datepicker.isInputValueEqual(initialState,
        `${newDate.toLocaleDateString('en-US')} - ${daySevenAfterCurrent.toLocaleDateString('en-US')}`, 1);
    });

    it('when user clicks on "Date Picker" button, bs-datepicker-container opened and current date selected', () => {
      datepicker.clickOnBtn(initialState, 0);
      datepicker.isDatepickerOpened(true);
      datepicker.isSelectedDateExist('datepicker', true, `${currentDay}`);
    });

    it('when user clicks on other date, that date selected and shown in input', () => {
      const dayToChose = currentDay === 15 ? '16' : '15';
      datepicker.clickOnBtn(initialState, 0);
      datepicker.clickOnDatepickerTableItem('date', undefined, dayToChose);
      datepicker.isDatepickerOpened(false);
      datepicker.isInputValueEqual(initialState, `${currentMonthNum + 1}/${dayToChose}/${currentYearStr}`, 0);
      datepicker.clickOnBtn(initialState, 0);
      datepicker.isSelectedDateExist('datepicker', true, `${dayToChose}`);
    });

    it('when user clicks on "Date Range Picker", bs-daterangepicker-container opened with interval selected', () => {
      datepicker.clickOnBtn(initialState, 1);
      datepicker.isDaterangepickerOpened(true);
      datepicker.isSelectedDateExist('daterangepicker', true, `${currentDay}`);
      datepicker.isSelectedDateExist('daterangepicker', true, `${daySevenAfterCurrent.getDate()}`);
    });

    it('when user chose another interval, that interval selected and shown in input', () => {
      const dayToChose = currentDay === 15 ? '16' : '15';
      const nextDayToChose = `${Number(dayToChose) + 1}`;
      datepicker.clickOnBtn(initialState, 1);
      datepicker.clickOnDaterangePickerTableItem('date', 0, undefined, dayToChose);
      datepicker.clickOnDaterangePickerTableItem('date', 0, undefined, nextDayToChose);
      datepicker.isDatepickerOpened(false);
      datepicker.isInputValueEqual(initialState,
        `${currentMonthNum + 1}/${dayToChose}/${currentYearStr} - ${
                      currentMonthNum + 1}/${nextDayToChose}/${currentYearStr}`, 1);
      datepicker.clickOnBtn(initialState, 1);
      datepicker.isSelectedDateExist('daterangepicker', true, dayToChose);
      datepicker.isSelectedDateExist('daterangepicker', true, nextDayToChose);
    });
  });

  describe('Custom date format', () => { //TODO need to change this demo, need to remove min-max
    const customFormat = datepicker.exampleDemosArr.customFormat;

    beforeEach(() => datepicker.scrollToMenu('Custom date format'));

    it(`example contains 3 Datepicker inputs, 3 clickable buttons, value in inputs is current day in diff formats:
                   "YYYY-MM-DD", "MM/DD/YYYY", "MMMM Do YYYY,h:mm:ss a"`, () => {
      datepicker.isInputHaveAttrs(customFormat, [{attr: 'formcontrolname', value: 'myDateYMD'}], 0);
      datepicker.isInputHaveAttrs(customFormat, [{attr: 'formcontrolname', value: 'myDateMDY'}], 1);
      datepicker.isInputHaveAttrs(customFormat, [{attr: 'formcontrolname', value: 'myDateFull'}], 2);
      datepicker.isButtonExist(customFormat, 'Date Picker', 0);
      datepicker.isButtonExist(customFormat, 'Date Picker', 1);
      datepicker.isButtonExist(customFormat, 'Date Picker', 2);
      datepicker.isInputValueEqual(customFormat, `${currentYearNum}-${currentMonthNum + 1}-${currentDay}`, 0);
      datepicker.isInputValueEqual(customFormat, `${currentMonthNum + 1}/${currentDay}/${currentYearNum}`, 1);
      datepicker.isInputValueContain(customFormat,
        `${newDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})}`, 2);
      datepicker.isInputValueContain(customFormat,
        `${newDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).toLowerCase().split('')[1]}`, 2);
    });

    it('when user click on the first "Date Picker" btn, chose other date - it chosen, appear in "YYYY-MM-DD"', () => {
      const dayToChose = currentDay === 15 ? '16' : '15';
      datepicker.clickOnBtn(customFormat, 0);
      datepicker.clickOnDatepickerTableItem('date', undefined, dayToChose);
      datepicker.isInputValueEqual(customFormat, `${currentYearNum}-${currentMonthNum + 1}-${dayToChose}`, 0);
    });

    it('when user click on the second "Date Picker" btn, chose other date - it chosen, appear in "MM/DD/YYYY"', () => {
      const dayToChose = currentDay === 15 ? '16' : '15';
      datepicker.clickOnBtn(customFormat, 1);
      datepicker.clickOnDatepickerTableItem('date', undefined, dayToChose);
      datepicker.isInputValueEqual(customFormat, `${currentMonthNum + 1}/${dayToChose}/${currentYearNum}`, 1);
    });

    it('when user click on the third "Date Picker" btn, chose other date - it chosen, MMMM Do YYYY,h:mm:ss a', () => {
      const dayToChose = currentDay === 15 ? '16' : '15';
      datepicker.clickOnBtn(customFormat, 2);
      datepicker.clickOnDatepickerTableItem('date', undefined, dayToChose);
      datepicker.isInputValueContain(customFormat,
        `${currentMonthStr} 15th ${currentYearNum}, `, 2);
      datepicker.isInputValueContain(customFormat,
        `${newDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).toLowerCase().split('')[1]}`, 2);    });
  });
});
