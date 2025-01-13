import { PageHeader } from "./components/PageHeader/PageHeader";
import { TodoList } from "./components/TodoList/TodoList";

function App() {
  return (
    <>
      <PageHeader title="React example todo list" />
      <TodoList></TodoList>
    </>
  );
}

export default App;
