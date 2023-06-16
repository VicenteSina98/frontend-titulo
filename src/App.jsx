import { QuoterProvider } from "./context/QuoterProvider";
import SafeApp from "./pages/SafeApp";

const App = () => (
  <QuoterProvider>
    <SafeApp />
  </QuoterProvider>
);

export default App;
