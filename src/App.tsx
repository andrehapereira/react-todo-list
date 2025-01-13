import { PageHeader } from "./components/PageHeader/PageHeader";
import { TodoList } from "./components/TodoList/TodoList";

function App() {
  return (
    <>
      <PageHeader title="React example todo list" />
      <div className="content-area max-w-screen-2xl mx-auto">
      <TodoList></TodoList>
      </div>
    </>
  );
}

export default App;
