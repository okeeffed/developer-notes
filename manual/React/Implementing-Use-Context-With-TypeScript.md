---
menu: React
name: Implementing React Context With TypeScript
---

# Implementing React Context With TypeScript

Here is a short overview of how the type-safety occured for these elements:

```ts
enum TodoAction {
  setTodo,
}

type TodoReducerState = {
  todo: Todo;
};

type TodoReducerAction = {
  type: TodoAction.setTodo;
  payload: Todo;
};

const TodoStateContext = React.createContext<TodoReducerState | undefined>(
  undefined,
);
TodoStateContext.displayName = 'TodoStateContext';

const TodoDispatchContext = React.createContext<
  React.Dispatch<TodoReducerAction> | undefined
>(undefined);
TodoDispatchContext.displayName = 'TodoDispatchContext';

function todoReducer(
  state: TodoReducerState,
  action: TodoReducerAction,
): TodoReducerState {
  switch (action.type) {
    case TodoAction.setTodo:
      return { ...state, todo: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoProvider: React.FC<{ initialState: { todo: Todo } }> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

// final hook to get the context back
type UseTodoTuple = [TodoReducerState, React.Dispatch<TodoReducerAction>];
function useTodo(): UseTodoTuple {
  const state = React.useContext(TodoStateContext);
  const dispatch = React.useContext(TodoDispatchContext);
  if (!state || !dispatch) {
    throw new Error('Requires TodoStateContext or TodoDispatchContext');
  }

  return [state, dispatch];
}
```
