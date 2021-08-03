import { Hidden } from "@material-ui/core";
import Dashboard from "../../Components/DashboardComponent";
import Logs from "../../Components/Logs";
import Sidebar from "../../Components/Sidebar";
import "./Home.scss";

function Home({ match }) {
  function setComponent() {
    if (!match.params.section)
      return (
        <>
          <Sidebar className="sidebar" highlight={match.params.section} />
          <Dashboard />
        </>
      );
    else
      switch (match.params.section) {
        case "activities":
          return (
            <>
              <Hidden smDown>
                <Sidebar className="sidebar" highlight={match.params.section} />
              </Hidden>
              <Logs />
            </>
          );
        case "dashboard":
          return (
            <>
              <Hidden smDown>
                <Sidebar className="sidebar" highlight={match.params.section} />
              </Hidden>
              <Dashboard />
            </>
          );
        default:
          return <div style={{ textAlign: "center", width: "100%" }}>404</div>;
      }
  }

  return <div className="home-comp">{setComponent()}</div>;
}

export default Home;
