import "./../styles/home.css";
import { useState, useEffect } from "react";
import Datepick from "./Datepick";
import AlarmCard from "./AlarmCard";
import audio from "./../alarm_sound.mp3";
var increment = 6;

function checkDates(date1, date2) {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  ) {
    return true;
  }
  return false;
}

function getTime() {
  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return time;
}

function incrementbyMins(date, x) {
  date.setMinutes(date.getMinutes() + x);
  return date;
}

function clone(src) {
  return src.concat();
}

function Home() {
  const [time, setTime] = useState(getTime());
  const [alarms, setAlarms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [alarmState, setAlarmState] = useState(false);
  const [countSnooze, setCountSnooze] = useState(0);
  const [medicationName, setMedicationName] = useState("");

  useEffect(() => {
    if (alarmState) {
      console.log("true");
      let ringtone = new Audio(audio);
      ringtone.play();
      ringtone.loop = true;

      if (countSnooze < 3) {
        // alert("Will snooze ");
        setTimeout(() => {
          ringtone.pause();
          var a = clone(alarms);
          a.push(incrementbyMins(a[0].date, increment));
          a.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
          if (countSnooze < 1) setAlarms(a);
          else if (countSnooze === 1) {
            console.log("Last alarm");
            setAlarms(a);
          }

          setCountSnooze(countSnooze + 1);
        }, 60000);
      } else {
        ringtone.pause();
        setCountSnooze(0);
      }
    }
  }, [alarmState]);

  useEffect(() => {
    const current = new Date();
    if (alarms.length >= 1 && checkDates(current, alarms[0].date)) {
      console.log("true in time useEffect");
      setAlarmState(true);
      return () => setAlarmState(false);
    }
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //   const handleSetAlarmButton = () => {
  //     const current = new Date();
  //     if (current - selectedDate > 0) {
  //       console.log("Select a time in future");
  //       return;
  //     }
  //     var a = clone(alarms);
  //     a.push(selectedDate);
  //     a.sort((a, b) => Date.parse(a) - Date.parse(b));
  //     setAlarms(a);
  //   };

  function handleSetAlarmButton() {
    const current = new Date();
    if (current - selectedDate > 0) {
      console.log("Select a time in the future");
      return;
    }
    const newAlarm = {
      date: selectedDate,
      medicationName: medicationName,
    };
    const updatedAlarms = [...alarms, newAlarm];
    updatedAlarms.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    setAlarms(updatedAlarms);
  }

  return (
    <div>
      <h1 className="currentTime">Time : {time}</h1>
      <div className="cardPosition">
        <div className="wrapper">
          <h3 className="wrapperH1">MEDICATION REMINDER </h3>
          <Datepick alarmDate={selectedDate} setAlarmDate={setSelectedDate} />
          <input
            className="datepicker"
            placeholder="enter medicine name"
            onChange={(e) => setMedicationName(e.target.value)}
            type="text"
          />
          <div className="setAlarmButton">
            <button className="Alarm-Set-Btn" onClick={handleSetAlarmButton}>
              Set Alarm
            </button>
          </div>
        </div>
        <div>
          <AlarmCard alarmset={alarms} setAlarmset={setAlarms} />
        </div>
      </div>
    </div>
  );
}
export default Home;
