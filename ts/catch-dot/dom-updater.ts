const random = () => Math.random() * 300;
const setElementText = (elem, text) => (elem.innerText = text.toString());
const setDotSize = size => {
  elem('dot').style.height = `${size}px`;
  elem('dot').style.width = `${size}px`;
};

export const elem = id => document.getElementById(id);
export const updatedDot = score => {
  if (score % 3 === 0) {
    elem('dot').style.backgroundColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  }
  setElementText(elem('dot'), score);
};
export const setTimerText = text => setElementText(elem('timer'), text);
export const moveDot = () => {
  setDotSize(5);
  elem('dot').style.transform = `translate(${random()}px, ${random()}px)`;
};
export const resetDotSize = () => setDotSize(30);
