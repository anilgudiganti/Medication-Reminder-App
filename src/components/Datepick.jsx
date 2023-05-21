import "./AlarmCard.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Datepick = ({ alarmDate, setAlarmDate }) => {
  const dateHandler = (date) => {
    setAlarmDate(date);
  };
  return (
    <div>
      <DatePicker
        className="datepicker"
        type="datetime"
        locale="en"
        placeholder="Set Alarm"
        selected={alarmDate}
        onChange={(date) => dateHandler(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
};

export default Datepick;
