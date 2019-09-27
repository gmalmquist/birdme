const canvas = document.getElementById('birdme');
const g = canvas.getContext('2d');
const baseImg = new Image();
baseImg.onload = () => {
  g.drawImage(baseImg, 0, 0, 512, 512);
};
baseImg.src = 'birdbase.png';

const placement = {
  x: 0,
  y: 0,
  w: 512,
  h: 512,
};

const drag = {
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  dragging: false,
  update: () => {/* noop */},
};

const load = () => {
  const pic = new Image();

  const drawPic = () => {
    g.clearRect(0, 0, 512, 512);
    const x = placement.x + (drag.dragging ? (drag.currentX - drag.startX) : 0);
    const y = placement.y + (drag.dragging ? (drag.currentY - drag.startY) : 0);
    g.drawImage(pic, x, y, placement.w, placement.h);
    g.drawImage(baseImg, 0, 0, 512, 512);
  };

  pic.onload = () => {
    const scale = 1.0 * 512 / pic.width;
    placement.w = Math.floor(pic.width * scale);
    placement.h = Math.floor(pic.height * scale);
    placement.x = 0;
    placement.y = 0;

    placement.x = Math.floor(512 / 2 - placement.w / 2);
    placement.y = Math.floor(512 / 2 - placement.h / 2);

    drawPic();

    drag.update = drawPic;
  };
  pic.src = document.getElementById('url').value;
};

document.onpaste = function(event){
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (index in items) {
    var item = items[index];
    if (item.kind === 'file') {
      var blob = item.getAsFile();
      var reader = new FileReader();
      reader.onload = event => {
        const url = event.target.result;
        document.getElementById('url').value = url;
        load();
      };
      reader.readAsDataURL(blob);
    }
  }
};

document.addEventListener('mousedown',  event => {
  const e = event || window.event;
  //e.preventDefault();

  drag.dragging = true;
  drag.startX = e.pageX;
  drag.startY = e.pageY;
  drag.currentX = e.pageX;
  drag.currentY = e.pageY;

  drag.update();
  return true;
});

document.addEventListener('mousemove', event => {
  const e = event || window.event;
  e.preventDefault();

  if (!drag.dragging) {
    return;
  }

  drag.currentX = e.pageX;
  drag.currentY = e.pageY;
  drag.update();
  return true;
});

document.addEventListener('mouseup', event => {
  const e = event || window.event;
  e.preventDefault();

  drag.currentX = e.pageX;
  drag.currentY = e.pageY;
  placement.x += drag.currentX - drag.startX;
  placement.y += drag.currentY - drag.startY;
  drag.dragging = false;
  drag.update();
  return true;
});
