import { unpack } from 'https://unpkg.com/@remy/unpack?module';
import { toHex } from './to.js';
const $ = (s) => document.querySelector(s);

const input = $('#template');
const output = $('#result');
const offset = $('#offset');

const presets = {
  bmp: `<a2$sig I$size I$reserved I$offset I$headerSize I$width i$height S$planes S$bitPP I$compress I$rawSize I$hr I$vr I$colors I$importantColors`,
  tap:
    '<S$headerLength C$flagByte C$type A10$filename S$length S$p1 S$p2 C$checksum',
  '3dos':
    '<A8$sig C$eof C$issue C$version I$length C$hType S$hFileLength n$autostart S$hOffset',
};
let file = null;

window.selectPreset = (name) => {
  input.value = presets[name].split(' ').join('\n');
};

const update = () => {
  if (file) {
    const offsetValue = parseInt(offset.value, 10);
    console.log(
      offsetValue,
      file.byteLength,
      offsetValue < 0 ? file.byteLength + offsetValue : offsetValue
    );

    const result = unpack(
      input.value.replace(/\n/g, ' ').trim(),
      file,
      offsetValue < 0 ? file.byteLength + offsetValue : offsetValue
    );
    // output.innerHTML = JSON.stringify(result, 0, 2);
    const printed = Object.keys(result).reduce((acc, curr) => {
      const value = result[curr];
      if (curr === '__offset') {
        return acc;
      }

      const className = typeof value === 'string' ? 'string' : 'raw';

      if (typeof value === 'number') {
        acc += `<span class="key">${curr}</span>: <span class="value number ${className}">${value}</span> <span class="hex">0x${toHex(
          value
        )}</span>\n`;
      } else {
        acc += `<span class="key">${curr}</span>: <span class="value ${className}">${JSON.stringify(
          value
        )}</span>\n`;
      }

      return acc;
    }, '');

    output.innerHTML = printed;
  }

  // cheap resize
  input.style.height = `${input.value.split('\n').length * 24 + 20}px`;
};

offset.oninput = update;
input.oninput = update;
update();

const root = document.documentElement;
root.ondragover = () => false;
root.ondragend = () => false;
root.ondrop = (e) => {
  e.preventDefault();

  const droppedFile = e.dataTransfer.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    console.log('file read', event.target);
    file = event.target.result;
    $('#of').innerHTML = ` (${file.byteLength} bytes)`;
    update();
  };
  console.log(droppedFile);
  reader.readAsArrayBuffer(droppedFile);

  return false;
};
