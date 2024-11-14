import "./App.css";
import { FormBuilder } from "./pages/FormBuilder";
import { DraggableForm } from "./pages/DraggableForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DraggableForm />,
  },
  {
    path: "/form-builder",
    element: <FormBuilder />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
