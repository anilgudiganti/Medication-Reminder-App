import "./AlarmCard.css";
function clone(src) {
  return src.concat();
}
function AlarmCard({ alarmset, setAlarmset }) {
  const handleDelete = (index) => {
    var arr = [];
    for (var i = 0; i < alarmset.length; i++) {
      if (i === index) continue;
      arr.push(alarmset[i]);
    }
    setAlarmset(arr);
  };
  return (
    <div>
      <div className="alarmListCard">
        <h1 className="alarmCardHead">Upcoming Alarms</h1>
        {alarmset.map((date, index) => (
          <div className="dates" key={index}>
            {date.medicationName} {`- on ${date.date.getDate()}/${
              date.date.getMonth() + 1
            }/${date.date.getFullYear()} 
                     @${date.date.getHours()}:${date.date.getMinutes()}`}
            <button className="deleteBtn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlarmCard;
