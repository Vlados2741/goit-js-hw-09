import Notiflix from 'notiflix';
const refs = {
  delay: document.querySelector(`[name=delay]`),
  step: document.querySelector(`[name=step]`),
  amount: document.querySelector(`[name=amount]`),
  form: document.querySelector(`form`),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  return promise;
};

function onGeneratePromise(e) {
  e.preventDefault();
  const ddelay = parseInt(refs.delay.value);
  const step = parseInt(refs.step.value);
  const ammount = parseInt(refs.amount.value);
  for (let i = 1; i <= ammount; i++) {
    const position = i;
    const delay = (position - 1) * step + +ddelay;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    };
  };

refs.form.addEventListener("submit", onGeneratePromise)