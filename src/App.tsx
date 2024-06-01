import { MainProvider } from "./context";
import { DashBoard } from "./pages";

function App() {
  return (
    <MainProvider>
      <DashBoard />
    </MainProvider>
  );
}

export default App;
