import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { availableColors } from "../../../utils/utils";
import styles from "../styles/components/TeamSelector.module.css";

const TeamSelector = ({ index, team, teams, onTeamChange }) => {
  return (
    <div className={styles.teamSelector}>
      <TextField
        label={`Equipo ${index + 1}`}
        value={team.name}
        onChange={(e) => onTeamChange(index, "name", e.target.value)}
        variant="outlined"
        size="small"
        className={styles.teamInput}
      />
      <FormControl size="small" className={styles.colorSelectControl}>
        <InputLabel>Color</InputLabel>
        <Select
          value={team.color}
          onChange={(e) => onTeamChange(index, "color", e.target.value)}
        >
          {availableColors.map((color) => (
            <MenuItem
              key={color}
              value={color}
              disabled={teams.some((t) => t.color === color)}
            >
              <div
                className={styles.colorBox}
                style={{ backgroundColor: color }}
              ></div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TeamSelector;
