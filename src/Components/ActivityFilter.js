import { Dialog, DialogContent, Hidden, Popover } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import FilterGrid from "./FilterGrid";

const Button = styled(MuiButton)(spacing);

function ActivityFilter(props) {
  // managing cope/close state of popups/dialog box
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

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

      <Hidden smDown>
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
          <FilterGrid {...props} setAnchor={setAnchor} />
        </Popover>
      </Hidden>

      <Hidden mdUp>
        <Dialog open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <DialogContent>
            <FilterGrid {...props} setAnchor={setAnchor} />
          </DialogContent>
        </Dialog>
      </Hidden>
    </div>
  );
}

export default ActivityFilter;
