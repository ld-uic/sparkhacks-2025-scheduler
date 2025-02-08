import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react"
import { useState } from "react";


function ScheduleComponent()
{
    const config = {
        viewType: "Week"
    }

    const [startingDate, setStartDate] = useState("2025-02-08")

    const handletimeranger = args => {
        setStartDate(args.day);
    }

    return (
        <div class="scheduler">
            <center>
            <DayPilotNavigator  
                selectionDay={startingDate} 
                onTimeRangeSelected={handletimeranger} 
            />
            </center>
            <DayPilotCalendar {...config} startDate={startingDate} />
        </div>
    )
}

export default ScheduleComponent;