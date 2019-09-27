const canvas = document.getElementById('birdme');
const g = canvas.getContext('2d');
const baseImg = new Image();
baseImg.onload = () => {
  g.drawImage(baseImg, 0, 0, 512, 512);
};
baseImg.src = 'birdbase.png';

const load = () => {
  const pic = new Image();
  pic.onload = () => {
    g.clearRect(0, 0, 512, 512);
    g.drawImage(pic, 0, 0, 512, 512);
    g.drawImage(baseImg, 0, 0, 512, 512);
  };
  pic.src = document.getElementById('url').value;
};

document.onpaste = function(event){
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  console.log(JSON.stringify(items)); // will give you the mime types
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
