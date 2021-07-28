import { Container, Typography } from "@material-ui/core";
import "../Styles/Dashboard.scss";

function Dashboard() {
  return (
    <main className="Dashboard">
      <Container>
        <Typography variant="h6" gutterBottom>
          <strong>Dashboard</strong>
        </Typography>
      </Container>
    </main>
  );
}

export default Dashboard;
