import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js';

class Query extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      getGraph('{goldberg(id: 2) {id, character, actor}')
    );
  }

  render() {
    const dispatch = this.props.dispatch;
    const fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    const goldberg = this.props.store.get('data').toObject();
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <h3>{goldberg.character}</h3>
        <p>{goldberg.actor}</p>
        <p>{goldberg.role}</p>
        <p>{goldberg.traits}</p>
        <input ref={node => { queryText = node; }}></input>
        <button onClick={() => { dispatch(getGraph(queryText.value)); }}>
          query
        </button>
      </div>
  );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

export const QueryContainer = connect(
 mapStateToProps
)(Query);
