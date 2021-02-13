import {action, observable, computed, runInAction, makeObservable} from "mobx";
import {enableStaticRendering} from "mobx-react";
import {useMemo} from "react";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

let store;

class Todo {
  id;
  title;
  finished = false;

  constructor(title) {
    this.id = Math.random();
    this.title = title;
  }
}

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable todos = [];

  @computed get unfinishedTodos() {
    return this.todos.filter((todo) => !todo.finished).length;
  }

  @action addTodo = (title) => {
    this.todos.push(new Todo(title));
  };

  @action deleteTodo = (id) => {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });
  };

  @action hydrate = (data) => {
    if (!data) return;

    this.todos = [];
  };
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
