
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyD0g-wfXH9nQlqFfLzRuXPSlBAiG0Lf3E8',
    q: `${searchTerm} in:name`,
    maxResults: 9
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  return `
    <div>
      <a class="js-result-name" href="${result.id.channelId}" target="_blank"></a>
      <p>Thumbnail: <img src="${result.snippet.thumbnails.medium.url}"> </p>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);