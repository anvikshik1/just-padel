import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './bookingList.css'
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import moment from 'moment';
import axios from '../../CustomAxios';
import { environment } from '../../env';

function BookongList() {
    const [value, onChange] = useState(new Date());
    const [mainCourtData, setMainCourtData] = useState([]);
    const [filteredCourts, setFilteredCourts] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    const [selectedSlot, setSelectedSlot] = useState("12:00 AM");
    const [selectedSlotRange, setSelectedSlotRange] = useState("12:00 AM-12:45 AM");
    const [selectedDate, setSelectedDate] = useState();
    const [slotsArr, setSlotsArr] = useState([]);
    const [timeCounter, setTimeCounter] = useState(45);
    const [slotData, setslotData] = useState([]);
    const [selectedCourtId, setSelectedCourtId] = useState("");
    const [selectedSlotPrice, setSelectedSlotPrice] = useState();
    const [selectedCourt, setSelectedCourt] = useState("");
    const [mainCourt, setMainCourt] = useState([]);
    const [userCartDetails, setUserCartDetails] = useState([]);

    const getMainCourt = async () => {
        const mainCourtsUrl = `${environment.baseUrl}maincourts/${id}`;
        const result = await axios(mainCourtsUrl);
        console.log(result.data);
        setMainCourt(id);
        setMainCourtData(result.data);
    };

    useEffect(() => {
        getMainCourt();
    }, []);

    const resetSelection = () => {
        setSelectedSlot("12:00 AM");
        setSelectedSlotRange("12:00 AM-12:45 AM");
        setslotData([]);
        setSelectedCourtId("");
        setSelectedCourt("");
        setSelectedSlotPrice();
        setTimeCounter(0);
    }

    const handleDateSelection = (dt) => {
        resetSelection();
        const date = moment(dt).format('YYYY-MM-DD');
        setSelectedDate(date);
        const availableSlotsPayload = {
            "date": date
        };
        const availableslotUrl = `${environment.baseUrl}availableslots`;
        console.log("availableSlotsPayload: ", availableSlotsPayload);
        var result = axios.post(availableslotUrl, availableSlotsPayload).then((response) => {
            if (response.status === 200 || response.status === 201) {
                //  console.log("Available slots: ", response?.data);
                const availableSlotByDate = response.data.filter(slot => {
                    return slot.date === date;
                });
                console.log("slotArr list before availableSlotByDate : ", availableSlotByDate);
                let modifiedSlots = [];
                availableSlotByDate.forEach(slot => {
                    let newSlot = {
                        "date": slot.date,
                        "id": slot.id,
                        "time": slot.time
                    }
                    //  console.log("=================",slot.availableslot);
                    const availableSlots = JSON.parse(slot.availableslot.replace(/'/g, '"'));
                    //  const availableSlots = slot.availableslot;
                    let newAvailableSlots = availableSlots.filter((aslot) => {
                        return aslot.main_court == id;
                    });
                    newSlot["availableslot"] = newAvailableSlots;
                    newSlot["available"] = newAvailableSlots.length ? true : false;
                    modifiedSlots.push(newSlot);
                });
                // console.log("modifiedSlots: ", modifiedSlots);
                let modifiedSlotArray = modifiedSlots.map((slot) => (
                    {
                        ...slot,
                        displayVal: slot.time.split("-")[0].trim(),
                        timestamp: moment(date + " " + slot.time.split("-")[0].trim(), 'YYYY-MM-DD, hh:mm A').format('X'),
                    }
                ));
                modifiedSlotArray = modifiedSlotArray.sort((a, b) => b.timestamp - a.timestamp).reverse();
                console.log("Sorted Aarray slotArr: ", modifiedSlotArray);
                setSlotsArr(modifiedSlotArray);
            } else {
                alert('Server error');
            }
        });
    };

    function handleTimeSelection(e) {
        setslotData([]);
        setSelectedCourtId("");
        setSelectedCourt("");
        setSelectedSlotPrice();
        setTimeCounter(0);
        const time = e.target.value;
        setSelectedSlot(time.split("-")[0].trim());
        setSelectedSlotRange(time)
        const filteredSlotsByTime = slotsArr.filter((slot) => slot.time === time);
        console.log('availableSlotByTime', filteredSlotsByTime[0]);
        if (filteredSlotsByTime?.length > 0) {
            const availableCourts = eval(filteredSlotsByTime[0]?.availableslot);
            // !important uncomment after main cort field added
            // eslint-disable-next-line radix
            const availableCourtsUnique = [];
            const map = new Map();
            for (const item of availableCourts) {
                if (!map.has(item.courtname)) {
                    map.set(item.courtname, true); // set any value to Map
                    availableCourtsUnique.push({
                        courtname: item.courtname,
                        Price: item.Price,
                        courttype: item.court_type,
                        ladiesOnly: item.ladiesOnly,
                        id: item.id,
                    });
                }
            }
            setFilteredCourts(availableCourtsUnique.sort((a, b) => (a.courtname > b.courtname) ? 1 : -1) ?? []);
            console.log('available: ', availableCourtsUnique);
            console.log('filteredCourts', filteredCourts);
        }
    };

    const handleCourtSelection = (item) => {
        setslotData([]);
        setTimeCounter(0)
        setSelectedCourtId(item.id);
        setSelectedCourt(item.courtname)
        setSelectedSlotPrice(item?.Price);
        console.log("Item court: ", item);
    };

    const addMin = async () => {
        let slotsArray = [];
        slotsArray = slotData;
        console.log(slotsArray);
        if (!selectedCourt) {
            alert("Please Select Court")
            return;
        }
        // console.log("selectedDate:", selectedDate);
        // console.log("selectedSlot:", selectedSlot);

        let dateObj1 = moment(selectedDate + ', ' + selectedSlot, 'YYYY-MM-DD, hh:mm A').add(45, 'minutes').format('hh:mm A');
        let prevdateObj1 = moment(selectedDate + ', ' + selectedSlot, 'YYYY-MM-DD, hh:mm A').add(-45, 'minutes').format('hh:mm A');
        const timeslot = selectedSlot + "-" + dateObj1;
        const prevtimeslot = prevdateObj1 + "-" + selectedSlot;
        // console.log("/////////////////////////////////////  TIMESLOTS ////////////////////////////////l",timeslot);
        // console.log("///////////////////////////////////// PREVIOUS TIMESLOTS ////////////////////////////////l",prevtimeslot);
        const booking_date = selectedDate;
        const court = parseInt(selectedCourtId);
        const maincourt = parseInt(mainCourt);
        const price = selectedSlotPrice;
        const maincourt_name = mainCourtData.courtName;
        // const prevtimeslot = prevdateObj1+"-"+selectedSlot;

        const slotsArrNew = slotsArr.filter(i => timeslot.includes(i.time));
        if (slotsArrNew.length === 0) {
            alert("There is no available slots for booking");
            // selectedSlot = prevtimeslot;
            setSelectedSlot(timeslot)
            return;
        } else {

            setTimeCounter(prev => timeCounter + 45)
            let pp = true;
            let dbprice;
            if (timeCounter >= 45) {
                pp = true;
                // const padelcourtUrl =`${config.API_URL}padelcourt/${court}`;
                const padelcourtUrl = `${environment.baseUrl}padelcourt/${court}`;
                await axios.get(padelcourtUrl)
                    .then((response) => {
                        console.log("Padel court Data", response.data.additional_slot_price);
                        dbprice = response.data.additional_slot_price;
                    });
                console.log("dbprice", dbprice)
            }
            else {
                pp = false;
            }
            console.log("PP", pp);
            const price = (pp ? dbprice : selectedSlotPrice);
            const maincourt_name = mainCourtData.courtName;

            setTimeCounter(prev => timeCounter + 45);
            setSelectedSlot(dateObj1);
            console.log("Slot1", timeslot)
            slotsArray.push({
                timeslot,
                booking_date,
                court,
                maincourt,
                price,
                maincourt_name,
            });
            setslotData(slotsArray);
            console.log("slot array: ", slotData);
        }
    }

    const subMin = () => {
        if (timeCounter) {
            console.log("selectedCourt", selectedCourt);
            if (!selectedCourt) {
                alert("Please Select Court")
                return;
            }
            console.log("selectedDate:", selectedDate);
            console.log("selectedSlot:", selectedSlot);
            slotData.splice(-1);
            let dateObj1 = moment(selectedDate + ', ' + selectedSlot, 'YYYY-MM-DD, hh:mm A').add(-45, 'minutes').format('hh:mm A');
            setSelectedSlot(dateObj1);
            setTimeCounter(prev => timeCounter - 45)
            console.log(slotData);
        }
    };

    const handleSubmit = () => {
        try {
          let existingWithNewCartSlotData = userCartDetails;
          slotData.forEach((s) => {
            existingWithNewCartSlotData.push(s);
          });
          console.log("existingWithNewCartSlotData: ", existingWithNewCartSlotData);
          const userId =  localStorage.getItem('UserId');
          const addToCartPayload = {
            "main_court_id": mainCourt,
            "court_id": selectedCourtId,
            "court_name": selectedCourt,
            "timeslot": selectedSlotRange,
            "date": selectedDate,
            "price": selectedSlotPrice,
            "selected_slot": JSON.stringify(existingWithNewCartSlotData),
            "user": userId,
          } 
          console.log("addToCartPayload", addToCartPayload);
          const addToCartUrl = `${environment.baseUrl}addtocart`;
          const result = axios.post(addToCartUrl, addToCartPayload)
            .then((response) => {
              console.log("Response: ",response);
             // localStorage.setItem('selectionDetails', JSON.stringify(slotData));
             history.push({ pathname: '/booking-addons' });
            }, (error) => {
              console.log("Promise error: ", error);
            })
        } catch (error) {
          console.log("add to cart error: ", error);
        }
      };

      const goBack = () => {
        history.push({ pathname: '/booknow' });
      };

    return (
        <div>
            <Navbar />
            <div className="calender-Container">
                <div className="inner-calender">
                    <div className="inner-lhs">
                        <Calendar
                            minDate={new Date()}
                            value={value}
                            onChange={handleDateSelection}
                        />
                        <div className="select-time">
                            <h2>Select Time</h2>
                            <select className="timeSlot" value={selectedSlotRange} onChange={handleTimeSelection}>
                                <option key="0">
                                    Select Time Slot
                                </option>
                                {slotsArr && slotsArr.map((item, index) => (
                                    <option key={index} value={item.time} disabled={!item.available} style={{ "color": item.available ? "#000" : "#767676" }}>
                                        {item.time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="select-inc-dec">
                            {filteredCourts.length ?
                                <div className="select-inc-dec" style={{ fontSize: 15, paddingTop: 15 }}>
                                    <h3>Select Mins</h3>
                                    <FontAwesomeIcon icon={faMinusCircle} className="faMinus" onClick={() => subMin()} />
                                    {/* <div className="timeline__icon file" style={{ margin: '0px 5px', "color": timeCounter ? "#000" : "#767676" }} onClick={() => subMin()}><span className="lnr lnr-circle-minus" /></div> */}
                                    {/* <h6>{timeCounter}Min</h6> */}
                                    <small>{timeCounter}Min</small>
                                    <FontAwesomeIcon icon={faPlusCircle} className="faPlus" onClick={() => addMin()} />
                                    {/* <div className="timeline__icon file" style={{ margin: '0px 5px' }} onClick={() => addMin()}><span className="lnr lnr-plus-circle" /></div> */}
                                </div>
                                :
                                ""
                            }
                        </div>
                    </div>


                    <div className="inner-rhs">
                        <div className="cart">
                        {filteredCourts.length ?
                            filteredCourts.map((court) => (
                                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                                <div className="clild-cart" onClick={() => handleCourtSelection(court)} style={{ 'backgroundColor': court.id == selectedCourtId ? '#ffc107' : '#ffffff' }}>
                                    <h5 style={{ 'color': court.id == selectedCourtId ? '#fff' : '#747474' }} className="number">{court.courtname}</h5>
                                    <h5 style={{ 'color': court.id == selectedCourtId ? '#fff' : '#747474', textTransform: 'uppercase', fontFamily: "sans-serif" }} className="doors">{court.courttype}</h5>
                                    <div>{court.ladiesOnly === 'True' ? <h5 className="ladies-only" style={{ textTransform: 'uppercase', color: '#ff0000', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Ladies Only</h5> : ''}</div>
                                </div>
                            ))
                            : <div>
                                <h3>Select the Date to view the time slots.</h3>
                            </div>
                        }
                        </div>
                        <div className="submit-btns">
                            <button className="add" onClick={handleSubmit}>Add to Cart</button>
                            <button className="cancel" onClick={goBack}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookongList


