import { DayPilotCalendar, DayPilotNavigator, DayPilot } from "@daypilot/daypilot-lite-react"
import { useEffect, useState } from "react";


function ScheduleComponent()
{
    const [startingDate, setStartDate] = useState("2025-02-08");
    const [calendar, setCalender] = useState(null);
    const [changedEvents, setChangedEvents] = useState([]);
    const [deletedEvents, setDeletedEvents] = useState([]);
    // BAD NAME BUT WHO CAREs
    const [changedREALEvents, setchangedREALEvents] = useState([]);

    function createUserEvent(startTime, endTime, id)
    {
        return {
            start: startTime,
            end: endTime,
            id: id,
        }
    }

    function appendState(prevState, newState)
    {
        return [...prevState, newState];
    }

    function updateChangedEvents(newEvent) {
        setChangedEvents([...changedEvents, newEvent]);
    }

    var TEST_events = [];

    useEffect(() => {
        const data = fetch("http://localhost:3000/retreve")
            .then(response => console.log(response.json().then(
                test=>{
                    for (var i = 0; i < test.length; i++)
                    {
                        console.log(test[i].start);
                        const start = test[i].start;
                        const end = test[i].end;
                        const id = test[i].id;


                        const created = createUserEvent(start, end, id);
                        //TEST_events = [...TEST_events, created];
                        calendar.events.add({
                            start: start,
                            end: end,
                            id: id,
                            text: "Work"
                          });
                    }
                }
            )))
    }, [calendar])


    const config = {
        viewType: "Week",
        onTimeRangeSelected: async args => {
            calendar.clearSelection();

            const id = DayPilot.guid();

            const userEvent = createUserEvent(args.start.value, args.end.value, id);

            updateChangedEvents(userEvent);

            console.log(id);
            console.log(changedEvents);

            calendar.events.add({
              start: args.start,
              end: args.end,
              id: id,
              text: "Work"
            });
          },

          onEventMoved: async args => {
            const changed = changedEvents.find(object=>args.e.data.id === object.id);

            if (changed)
            {
                const newData = changedEvents.filter(object=> args.e.data.id !== object.id);

                setChangedEvents([...newData, createUserEvent(args.e.data.start.value, args.e.data.end.value, args.e.data.id)]);
            } else {
                setchangedREALEvents([...changedREALEvents, createUserEvent(args.e.data.start.value, args.e.data.end.value, args.e.data.id)]);
            }
          },

          contextMenu: new DayPilot.Menu({
            items: [
                {
                    text: "Delete",
                    onClick: async args => {
                        var wasChanged = false;

                        const filtered = changedEvents.filter(object =>{
                            if (!wasChanged)
                            {
                                if (object.id === args.source.id())
                                {
                                    wasChanged = true;
                                }
                            }

                            return object.id !== args.source.id()
                        })

                        var changeTimeChanged = false

                        const filtered_changed = changedREALEvents.filter(object => {
                            if (!changeTimeChanged)
                            {
                                if (object.id === args.source.id())
                                {
                                    changeTimeChanged = true;
                                }
                            }

                            return (object.id !== args.source.id())
                        })

                        if (wasChanged)
                        {
                            setChangedEvents(filtered);
                        } else if (changeTimeChanged) {
                            setchangedREALEvents(filtered_changed);
                            setDeletedEvents([...deletedEvents, args.source.id()]);
                        } else {
                            setDeletedEvents([...deletedEvents, args.source.id()]);
                        }

                        console.log(filtered);

                        calendar.events.remove(args.source);
                    }
                }
            ]}
        ),
    }

    const handletimeranger = args => {
        setStartDate(args.day);
    }

    function submitChanges()
    {
        fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changedREALEvents)
        })
        fetch("http://localhost:3000/new", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changedEvents)
        })
        fetch("http://localhost:3000/delete", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedEvents)
        })

        changedREALEvents.length = 0;
        changedEvents.length = 0;
        deletedEvents.length = 0;

    }

    return (
        <div class="scheduler">
            <center>
            <DayPilotNavigator  
                selectionDay={startingDate} 
                onTimeRangeSelected={handletimeranger} 
            />
            </center>
            <DayPilotCalendar {...config} startDate={startingDate} controlRef={setCalender} />
            <button onClick={submitChanges}>SUBMIT CHANGES</button>
        </div>
    )
}

export default ScheduleComponent;