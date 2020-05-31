/**
 * Return search result based on data returned from the search api // TODO: temp docks, fix or remove
 */
export default function deliverSearch(parameters = {query: '', category: ''}, callback) {
  const { query } = parameters;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', searchProductEndpoint(query));
  xhr.onreadystatechange = function() {
    // TODO: ?check/log other readyStates??
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log(transformResponseData(JSON.parse(xhr.responseText)));
      callback(transformResponseData(JSON.parse(xhr.responseText)));
    } else {
      // TODO: error handling
    }
  };

  xhr.send();
}

function ResultItem(parameters = { title: '', tags: [''], imageUrl: '' }) {
  this.title = parameters.title;
  this.tags = parameters.tags;
  this.imageUrl = parameters.imageUrl;
}

function transformResponseData(data = []) {
  return data.map(member => {
    const tags = ['foo', 'baz', 'bar']; /* TODO: hardcoded, not sure how to get the tags data */
    const { title, imageUrl } = member;

    return new ResultItem({ tags, title, imageUrl });
  });
}


const endpointRoot = 'https://pcsa57ebsj.execute-api.us-east-1.amazonaws.com/api';

const searchProductEndpoint = query => `${endpointRoot}/products/search?query=${query}`;
