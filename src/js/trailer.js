import * as basicLightbox from 'basiclightbox';
const apiKey = '2955876276611e1cc2d97a4794387b9d';

function createTrailerLink(elementRef) {
  const trailer = elementRef;

  trailer.forEach(el =>
    el.addEventListener('click', e => {
      markupModalForTrailer(e.target.dataset.id);
    }),
  );
}

function markupModalForTrailer(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const id = data.results[0].key;
      const youtubeVideo = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
      youtubeVideo.show();
      toModalTrailer(youtubeVideo);
    });
}

function toModalTrailer(youtubeVideo) {
  const modalBox = document.querySelector('.basicLightbox--iframe');
  modalBox.insertAdjacentHTML(
    'afterbegin',
    `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        ></button>
    `,
  );
  const modalCloseBtn = document.querySelector(
    '[data-action="close-lightbox"]',
  );
  modalCloseBtn.addEventListener('click', () => youtubeVideo.close());
}

export default { markupModalForTrailer, toModalTrailer, createTrailerLink };
