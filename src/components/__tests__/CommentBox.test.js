import React from 'react';
// full DOM render
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a text area and two button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
  beforeEach(() => {
    // make the text area think that a change happened on it.
    wrapped.find('textarea').simulate('change', {
      // this merges into the event object
      target: { value: 'new comment' }
    });
    // setState does not immediately re-render the component.
    // It is asynchronous and we have to wait for the re-render
    // to kick in.
    // force component to re render
    wrapped.update();
  });
  it('has a test area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, text area gets emptied', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
