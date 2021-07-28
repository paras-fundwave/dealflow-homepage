import {
  Drawer,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Dashboard, History } from "@material-ui/icons";
import "../Styles/Sidebar.scss";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    paddingTop: "20px",
    width: "inherit",
  },
}));

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#543855",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&$selected:hover": {
      backgroundColor: "#543855",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:hover": {
      backgroundColor: "rgba(84,56,85,0.2)",
      color: "#543855",
      "& .MuiListItemIcon-root": {
        color: "#543855",
      },
    },
  },
  selected: {},
})(MuiListItem);

function Sidebar() {
  const classes = useStyles();
  const location = useLocation();

  const itemList = [
    {
      text: "Dashoard",
      icon: <Dashboard />,
      link: "/dashboard",
    },
    {
      text: "Activity Logs",
      icon: <History />,
      link: "/activities",
    },
  ];

  return (
    <Drawer
      style={{ width: "230px" }}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        {itemList.map((item, index) => {
          const { text, icon, link } = item;
          return (
            <Link to={link} key={index}>
              <ListItem
                key={index}
                button
                selected={
                  location.pathname === link ||
                  (link === "/dashboard" && location.pathname === "/")
                    ? true
                    : false
                }
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
