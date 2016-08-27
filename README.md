# flux-utils
A collection of utility classes for Flux implementation

[![Travis](https://travis-ci.org/holywyvern/flux-utils.svg?branch=master)](https://travis-ci.org/holywyvern/flux-utils)
[![Code Climate](https://codeclimate.com/github/holywyvern/flux-utils/badges/gpa.svg)](https://codeclimate.com/github/holywyvern/flux-utils) 
[![Test Coverage](https://codeclimate.com/github/holywyvern/flux-utils/badges/coverage.svg)](https://codeclimate.com/github/holywyvern/flux-utils/coverage) 
[![Issue Count](https://codeclimate.com/github/holywyvern/flux-utils/badges/issue_count.svg)](https://codeclimate.com/github/holywyvern/flux-utils)
[![Inch CI](http://inch-ci.org/github/holywyvern/flux-utils.svg?branch=master)](http://inch-ci.org/github/holywyvern/flux-utils)
## Installing

```
npm install --save nova-flux
```

## Using

### First it's needed to create actions:

#### ES5:

```js
var flux = require('nova-flux');

// To look more react-like
var MyActions = flux.createActions('createTodo', 'removeTodo');
// To look more classic
var MyActions = new flux.Actions('createTodo', 'removeTodo');

```

#### ES6:

```js

import { Actions } from 'nova-flux';

var MyActions = new Actions('createTodo', 'removeTodo');

```

### Actions can be called directly

```js
// Actions can be called directly:
MyActions.createTodo(name, false); // Also, any number of arguments.
```

### Then create an Store to use those actions:

#### ES5:

```js
var flux = require('nova-flux');

// You ca use flux.createStore also
var MyStore = flux.createStore({
    actions: MyActions,
    methods: {
        addTodo(name, done) {
            let state = this.state; // deep copies it
            state.todos.push({ name, done });
            this.state = state; // Saves the new state and emit changes
        },
        removeTodo() {

        }
    },
    state: { todos: [] }
});


```

#### ES6:

```js

import { Store } from 'nova-flux';

// You ca use flux.createStore also
var MyStore = new Store({
    actions: MyActions,
    methods: {
        addTodo(name, done) {
            let state = this.state; // deep copies it
            state.todos.push({ name, done });
            this.state = state; // Saves the new state and emit changes
        },
        removeTodo() {

        }
    },
    state: { todos: [] }
});

```

### Now you can look out for events

When state is changed the event change is automatically fired:

Flux could be used without [React](https://facebook.github.io/react/) but because is popular,
here is a React component showing how it works.

```js

class MyComponent extends React.Component {

    // ... More code ...

    onMyStoreChange = () => {
        // when you get the state is deep cloned, 
        // so no worries and no change to modify it.
        this.setState(MyStore.state); 
    }

    componentWillMount() {
        // Adding the handle
        MyStore.events.on('change', this.onMyStoreChange);
    }

    componentWillUnmount() {
        // Remove it when not needed
        MyStore.events.off('change', this.onMyStoreChange);
    }

    // ... More code ...

}

```

Events are using my custom [Event Manager](https://github.com/holywyvern/generic-events)
and they are using composition, instead of inheritance.
