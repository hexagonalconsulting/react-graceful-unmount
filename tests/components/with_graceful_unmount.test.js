import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme';
// this configuration code has to run in order to configure the enzyme adapter.
import  '../configuration'
import sinon from 'sinon';

import HelloJest from '../../src/components/HelloJest'
import withGracefulUnmount from '../../src/components/with_graceful_unmount'

const WrappedHelloJest =  withGracefulUnmount(HelloJest);
describe('withGracefulUnmount', ()  => {

  it( 'renders the wrapped component', () => {

    const component = renderer.create(
      <WrappedHelloJest/>
    );

    expect(component).toMatchSnapshot();

  });

  it( 'calls the componentWillMount on mount', () => {

    sinon.spy(WrappedHelloJest.prototype, 'componentDidMount');

    const mountedWrapper = mount(<WrappedHelloJest />);

    expect(WrappedHelloJest.prototype.componentDidMount.calledOnce).toBe(true);

  });

  it( 'calls the componentWillUnmount on unmount', () => {

    sinon.spy(WrappedHelloJest.prototype, 'componentWillUnmount');

    const mountedWrapper = mount(<WrappedHelloJest />);
    mountedWrapper.unmount();

    expect(WrappedHelloJest.prototype.componentWillUnmount.calledOnce).toBe(true);

  });

  describe('wrapped component hooks to the events using event listeners', () => {

    it( 'adds the callbacks hooking to the browser event "beforeunload" and "turbolinks:before-render" (from turbolinks)', () => {

      const sinonSpiesWindow = sinon.spy(window, 'addEventListener');

      const mountedWrapper = mount(<WrappedHelloJest />);

      expect(sinonSpiesWindow.called).toBe(true);
      expect(sinonSpiesWindow.calledWith('beforeunload')).toBe(true);
      expect(sinonSpiesWindow.calledWith('turbolinks:before-render')).toBe(true);

    });

    it( 'the wrapped component does unhook removing the event listeners on unmount', () => {

      const sinonSpiesWindow = sinon.spy(window, 'removeEventListener');

      const mountedWrapper = mount(<WrappedHelloJest />);
      mountedWrapper.unmount();

      expect(sinonSpiesWindow.called).toBe(true);
      expect(sinonSpiesWindow.calledWith('beforeunload')).toBe(true);
      expect(sinonSpiesWindow.calledWith('turbolinks:before-render')).toBe(true);

    });

  })

});