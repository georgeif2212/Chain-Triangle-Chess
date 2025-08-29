import React from "react";
import Typography from "@mui/material/Typography";
import styles from "@styles/components/ui/TeamBox.module.css";

const TeamBox = ({ team, index }) => {
  return (
    <div
      className={styles.teamCard}
      style={{
        borderColor: team.color,
        backgroundColor: `${team.color}63`, // con transparencia
      }}
    >
      <Typography variant="body1" className={styles.teamText}>
        {team.name}
      </Typography>
    </div>
  );
};

export default TeamBox;
