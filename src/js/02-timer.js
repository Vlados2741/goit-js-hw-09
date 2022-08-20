import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    datetimePicker: document.querySelector(`#datetime-picker`),
    btnStart: document.querySelector(`[data-start]`),
    days: document.querySelector(`[data-days]`),
    hours: document.querySelector(`[data-hours]`),
    minutes: document.querySelector(`[data-minutes]`),
    seconds: document.querySelector(`[data-seconds]`),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    };
    refs.btnStart.disabled = false;
    refs.btnStart.addEventListener("click", () => {
      const timerId = setInterval(() => {
        const time = selectedDates[0] - Date.now();
        convertMs(time);
        if (time < 1000)  {
            refs.btnStart.disabled = true;
          clearInterval(timerId);
        }
      }, 1000);
    });
  },  
};


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  refs.days.textContent = days;
  refs.days.textContent = addLeadingZero(refs.days.textContent);
  const hours = Math.floor((ms % day) / hour);
  refs.hours.textContent = hours;
  refs.hours.textContent = addLeadingZero(refs.hours.textContent);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  refs.minutes.textContent = minutes;
  refs.minutes.textContent = addLeadingZero(refs.minutes.textContent);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  refs.seconds.textContent = seconds;
  refs.seconds.textContent = addLeadingZero(refs.seconds.textContent);

  return { days, hours, minutes, seconds };
}

flatpickr(refs.datetimePicker, options);

function addLeadingZero(value) {
  if (value < 10) {
    return value.padStart(2, "0");
  } else {
    return value;
  };
};
