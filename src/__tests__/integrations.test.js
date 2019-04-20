import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
  // turn off any requests issued by axios
  moxios.install();
  // fool axios into thinking this is the response
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

// Use done to tell jest to hold on and not fail the test untill the setTimeout
// has run
it('can fetch a list of comments and display them', done => {
  // Attempt to render the entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  // find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');
  // introduce a delay so that moxios has time to intercept the request
  // and respond with a fake list of comments

  moxios.wait(() => {
    wrapped.update();
    // Expect to find a list of comments
    expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
