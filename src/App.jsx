import { QuoterProvider } from "./context/QuoterProvider";
import SafeApp from "./SafeApp";

const App = () => (
  <QuoterProvider>
    <SafeApp />
  </QuoterProvider>
);

export default App;
