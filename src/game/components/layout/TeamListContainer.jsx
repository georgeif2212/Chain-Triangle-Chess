import TeamSelector from "@components/selectors/TeamSelector.jsx";

const TeamListContainer = ({teams, onTeamChange}) => {  
  return (
    <>
      {teams.map((team, index) => (
        <TeamSelector
          key={index}
          index={index}
          team={team}
          teams={teams}
          onTeamChange={onTeamChange}
        />
      ))}
    </>
  );
};

export default TeamListContainer;
