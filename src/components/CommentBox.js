import React, { useState } from 'react';
import { connect } from 'react-redux';
// grab all actions
import * as actions from 'actions';
import 'components/CommentBox.css';

function CommentBox(props) {
  const [comment, setComment] = useState('');

  const handleChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.saveComment(comment);
    setComment('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add a comment</h4>
        <div className="form-group">
          <textarea
            className="form-control"
            value={comment}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-light">Submit Comment</button>
        </div>
      </form>
      <br />
      <button
        className="btn btn-light fetch-comments"
        onClick={props.fetchComments}
      >
        Fetch Comments
      </button>
      <br />
    </div>
  );
}

export default connect(
  null,
  actions
)(CommentBox);
