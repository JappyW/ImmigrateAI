import "./App.css";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { FormBuilder } from "./pages/FormBuilder";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilder></FormBuilder>
    </DndProvider>
  );
}

export default App;
