/* This webAPP was created by SkyX [ID FR], Darcie07, Dark007, Akare90 ! */

const fileInput = document.getElementById('file-input');
const image = document.getElementById('image');
const description = document.getElementById('prediction');
const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
const inputError = document.getElementById('input-error');

let model;

function displayDescription(predictions) {

  const result = predictions.sort((a, b) => a > b)[0];

  if (result.probability > 0.2) {
    const probability = Math.round(result.probability * 100);
    description.innerText = `C'est à ${probability}% sûre que c'est un/une ${result.className.replace(',', ' ou le/la')}`;
  } else description.innerText = 'Désolé, mais IA Pictures & More© ne peux pas reconnaître ton image... 😢';
}

function classifyImage() {
  model.classify(image).then((predictions) => {
    displayDescription(predictions);
  });
}

function getImage() {

  if (!fileInput.files[0]) throw new Error('Image not found');
  const file = fileInput.files[0];

  if (!acceptedImageTypes.includes(file.type)) {
    inputError.classList.add('show');
    throw Error('The uploaded file is not an image');
  } else inputError.classList.remove('show');

  const reader = new FileReader();

  reader.onload = function (event) {
    const dataUrl = event.target.result;

    const imageElement = new Image();
    imageElement.src = dataUrl;

    imageElement.onload = function () {
      image.setAttribute('src', this.src);
      image.setAttribute('height', this.height);
      image.setAttribute('width', this.width);

      classifyImage();
    };

    document.body.classList.add('image-loaded');
  };
  reader.readAsDataURL(file);
}

mobilenet.load().then((m) => {
  model = m;
  document.body.classList.remove('loading');
  fileInput.addEventListener('change', getImage);
});

/* END */