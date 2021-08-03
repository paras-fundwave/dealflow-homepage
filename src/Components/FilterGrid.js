import {
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import { memberFilterData, teamFilterData } from "./data";
import "../Styles/FilterGrid.scss";

const Button = styled(MuiButton)(spacing);

const useStyles = makeStyles({
  root: {
    color: "#fff!important",
    backgroundColor: "#449d44!important",
  },
});

function FilterGrid({
  teamFilters,
  setTeamFilters,
  memberFilters,
  setMemberFilters,
  setAnchor,
}) {
  const classes = useStyles();

  // filter values
  let selectedTeams = teamFilters;
  let selectedMembers = memberFilters;

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
      data: memberFilterData, //teamData,
      default: selectedMembers,
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
        selectedMembers = filterData;
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
    setMemberFilters([]);
    setTeamFilters([]);
  }

  function setFilters() {
    setAnchor(null);
    setTeamFilters(selectedTeams);
    setMemberFilters(selectedMembers);
  }

  return (
    <div className="filter-menu">
      {/* Mapping all filter options instead of repeating */}
      {filterOptions.map((filter, index) => (
        <Grid key={index}>
          <header className="divider-title">
            <Typography variant="caption" color="textSecondary" display="block">
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
            onChange={(event, value) => storeFilterData(value, filter.title)}
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
  );
}

export default FilterGrid;
