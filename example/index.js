import unpack from '../src/unpack.js';
const input = document.querySelector('#template');
const output = document.querySelector('#result');

let file = null;

const update = () => {
  if (file) {
    const result = unpack(input.value.replace(/\n/g, ' ').trim(), file);
    console.log(result);
    output.innerHTML = JSON.stringify(result, 0, 2);
  }

  // cheap resize
  input.style.height = `${input.value.split('\n').length * 24 + 20}px`;
};

input.oninput = update;
update();

const root = document.documentElement;
root.ondragover = () => false;
root.ondragend = () => false;
root.ondrop = e => {
  e.preventDefault();

  const droppedFile = e.dataTransfer.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    console.log('file read', event.target);

    file = event.target.result;
    update();
  };
  console.log(droppedFile);
  reader.readAsArrayBuffer(droppedFile);

  return false;
};
