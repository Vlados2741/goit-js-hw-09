refs = {
    dataStart: document.querySelector(`[data-start]`),
    dataStop: document.querySelector(`[data-stop]`),
    body: document.querySelector(`body`)
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

let timerId = null;

refs.dataStop.disabled = true;


const onColorChangerDisabled = () => {
    refs.dataStart.disabled = false;
    refs.dataStop.disabled = true;
    clearInterval(timerId);
};

const onColorChanger = () => {
    refs.dataStop.disabled = false;
    refs.dataStart.disabled = true;
    timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor(); ;
    }, 1000);
};


refs.dataStart.addEventListener(`click`, onColorChanger);
refs.dataStop.addEventListener(`click`, onColorChangerDisabled);
