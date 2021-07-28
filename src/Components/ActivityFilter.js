import {
  Divider,
  Grid,
  makeStyles,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import { userFilterData, teamFilterData } from "./dealdata";
import "../Styles/ActivityFilter.scss";

const Button = styled(MuiButton)(spacing);

const useStyles = makeStyles({
  root: {
    color: "#fff!important",
    backgroundColor: "#449d44!important",
  },
});

function ActivityFilter({
  teamFilters,
  setTeamFilters,
  userFilters,
  setUserFilters,
}) {
  const classes = useStyles();
  // for Popover Element
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

  // filter values
  let selectedTeams = teamFilters;
  let selectedUsers = userFilters;

  const filterOptions = [
    {
      title: "TEAMS",
      placeholder: "Team",
      data: teamFilterData, //teamData,
      default: selectedTeams,
    },
    {
      title: "USERS",
      placeholder: "User",
      data: userFilterData, //teamData,
      default: selectedUsers,
    },
  ];

  function setLabel(filterData, filterType) {
    switch (filterType) {
      case "USERS":
        return filterData.name;
      case "TEAMS":
        return filterData.label;

      default:
        return "byye";
    }
  }

  function storeFilterData(filterData, filterType) {
    switch (filterType) {
      case "USERS":
        selectedUsers = filterData;
        break;
      case "TEAMS":
        selectedTeams = filterData;
        break;
      default:
        console.log("Filter doesn't exist");
        break;
    }
  }

  function resetFilters() {
    setAnchor(null);
    setUserFilters([]);
    setTeamFilters([]);
  }

  function setFilters() {
    setAnchor(null);
    setTeamFilters(selectedTeams);
    setUserFilters(selectedUsers);
  }

  return (
    <div className="filter-button-container">
      {/* Main Filter Button */}
      <Button
        disableElevation
        startIcon={<FilterList />}
        variant="outlined"
        size="small"
        onClick={openPopover}
      >
        Filter
      </Button>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        onClose={() => setAnchor(null)}
      >
        <div className="filter-menu">
          {/* Mapping all filter options instead of repeating */}
          {filterOptions.map((filter, index) => (
            <Grid key={index}>
              <header className="divider-title">
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  <strong>{filter.title}</strong>
                </Typography>
              </header>
              <Divider />
              <Autocomplete
                multiple
                clearOnBlur={false}
                defaultValue={filter.default}
                id={filter.placeholder}
                options={filter.data}
                style={{
                  width: 300,
                  margin: "10px",
                }}
                groupBy={(options) => (options.groupBy ? options.groupBy : "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={filter.placeholder}
                    variant="outlined"
                  />
                )}
                getOptionLabel={(option) => setLabel(option, filter.title)}
                onChange={(event, value) =>
                  storeFilterData(value, filter.title)
                }
              />
            </Grid>
          ))}

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ padding: "10px 0" }}
          >
            <Button margin={1} onClick={resetFilters}>
              Reset
            </Button>
            <Button
              margin={1}
              onClick={setFilters}
              classes={{ root: classes.root }}
            >
              Apply
            </Button>
          </Grid>
        </div>
      </Popover>
    </div>
  );
}

export default ActivityFilter;
