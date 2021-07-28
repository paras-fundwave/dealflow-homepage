import { useLocation } from "react-router-dom";
import Dashboard from "../../Components/DashboardComponent";
import Logs from "../../Components/Logs";
import Sidebar from "../../Components/Sidebar";
import "./Home.scss";

function Home() {
  let location = useLocation();
  function setComponent() {
    switch (location.pathname) {
      case "/activities":
        return <Logs />;
      case "/dashboard":
      case "/":
        return <Dashboard />;
      default:
        return <div>404</div>;
    }
  }
  return (
    <div className="home-comp">
      <Sidebar className="sidebar" highlight={location.pathname} />
      {setComponent()}
    </div>
  );
}

export default Home;
