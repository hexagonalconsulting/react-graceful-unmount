## What is this about?

This package is about assuring that the `componentWillUnmount` lifecycle method always run, 
so if you find yourself in a situation where you expect that method to run but it is not being called this package is for you.

### What may be impeding the `componentWillUnmount` from being called: 
This behavior may be produced by something modifying the DOM structure outside from React control. Something may be preventing React to have the chance to call that method or even unmount the component properly. 
For example, the node where your component is mounted (or its parent) is being removed from the DOM tree by some ajax request or something similar that is not controlled by React, 
(your application could have that type of behavior if you are using jQuery alongside React and jQuery is modifying the DOM node where React has your component mounted).

### How does it work?

This package provides a higher order component that you can use to assure your component `componentWillUnmount`  lifecycle method is called.
It does this by hooking to the ['beforeunload'](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) event and making the wrapped
component to unmount according to this event. If you are using [rails](http://rubyonrails.org/) we've got you covered, this higher order component also
hooks to the ['turbolinks:before-render'](https://github.com/turbolinks/turbolinks#full-list-of-events), so your component will also unmount according to that event.

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install react-graceful-unmount
    $ yarn add react-graceful-unmount

## Usage

Example:
```
    import withGracefulUnmount from 'react-graceful-unmount'
    import React, {Component} from 'react'
    
    class YourComponent extends Component {
        
        componentWillUnmount() {
           // This function will always be called.
           console.log('running componentWillUnmount() in YourComponent') 
        }
        
        render() {
            return <div> Hello World </div>
        }
    }
    
    // This will export your component wrapped with react-graceful-unmount functionality.
    export default withGracefulUnmount(YourComponent)

```
    
   
