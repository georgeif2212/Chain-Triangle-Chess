import styles from "@styles/components/layout/TeamSelector.module.css";
import TeamSelector from "@components/selectors/TeamSelector.jsx";

const TeamListContainer = ({ teams, onTeamChange }) => {
  return (
    <div className={styles.teamGrid}>
      {teams.map((team, index) => (
        <TeamSelector
          key={index}
          index={index}
          team={team}
          teams={teams}
          onTeamChange={onTeamChange}
        />
      ))}
    </div>
  );
};

export default TeamListContainer;
