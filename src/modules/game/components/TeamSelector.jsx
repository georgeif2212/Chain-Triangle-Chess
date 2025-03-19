import { TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { availableColors } from "../../../utils/utils";

const TeamSelector = ({ index, team, teams, onTeamChange }) => {
  return (
    <div className="team-selector">
      <TextField
        label={`Equipo ${index + 1}`}
        value={team.name}
        onChange={(e) => onTeamChange(index, "name", e.target.value)}
        variant="outlined"
        size="small"
      />
      <FormControl size="small">
        <InputLabel>Color</InputLabel>
        <Select
          value={team.color}
          onChange={(e) => onTeamChange(index, "color", e.target.value)}>
          {availableColors.map((color) => (
            <MenuItem
              key={color}
              value={color}
              disabled={teams.some((t) => t.color === color)}>
              <div className="color-box" style={{ backgroundColor: color }}></div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TeamSelector;
