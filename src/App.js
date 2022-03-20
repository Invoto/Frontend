import InvotoRouter from "./router";
import InvotoWeb from "./layouts/InvotoWebLayout";

function App({ ...rest }) {
  return <InvotoRouter
    layout={InvotoWeb}
  />
}

export default App;
