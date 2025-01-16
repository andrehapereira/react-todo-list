import { PageHeaderComponent } from "./components/PageHeaderComponent/PageHeaderComponent";
import { TodoListPageContainerComponent } from "./components/TodoListPageContainerComponent/TodoListPageContainerComponent";

function App() {
  return (
    <>
      <PageHeaderComponent title="Todo List (React)" />
      <div className="content-area max-w-screen-2xl mx-auto">
        <TodoListPageContainerComponent />
      </div>
    </>
  );
}

export default App;
