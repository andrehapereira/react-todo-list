import { PageHeader } from "./components/PageHeader/PageHeader";
import { TodoListPageContainer } from "./components/TodoListPageContainer/TodoListPageContainer";

function App() {
  return (
    <>
      <PageHeader title="React example todo list" />
      <div className="content-area max-w-screen-2xl mx-auto">
      <TodoListPageContainer></TodoListPageContainer>
      </div>
    </>
  );
}

export default App;
