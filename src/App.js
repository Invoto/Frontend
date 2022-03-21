import InvotoRouter from "./router";
import InvotoWeb from "./layouts/InvotoWebLayout";
import InvotoDashboard from "./layouts/InvotoDashboardLayout";

function App({ ...rest }) {
  return <InvotoRouter
    layoutWeb={InvotoWeb}
    layoutDashboard={InvotoDashboard}
  />
}

export default App;
