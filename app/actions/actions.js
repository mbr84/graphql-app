const startingRequest = () => (
  {
    type: 'STARTING_REQUEST',
  }
);

const finishedRequest = (response) => (
  {
    type: 'FINISHED_REQUEST',
    response: response,
  }
);

export const getGraph = (payload) => {
  return dispatch => {
    dispatch(startingRequest());
    return new Promise(function(resolve) {
      let request = new XMLHttpRequest();
      request.open('POST', '/graphql', true);
      request.setRequestHeader('Content-Type',
                               'application/graphql');
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText);
        }
      };
    }).then(response =>
            dispatch(finishedRequest(JSON.parse(response))));
  };
};
