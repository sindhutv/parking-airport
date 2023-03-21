import React, { useState, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios';
import AirportSuggetions from '../component/AirportSuggestions';


const SearchForm = () => {
    const today = moment().format('YYYY-MM-DD').toString()
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD').toString()
    const [airports, setAirports] = useState([])
    const [filteredAirports, setFilteredAirports] = useState([])
    const [departureAirport, setDepartureAirPort] = useState('')
    const [checkin, setCheckIn] = useState(today)
    const [checkout, setCheckOut] = useState(tomorrow)
    const [errors, setErrors] = useState({})


    const getAirport = async () => {
        try {
            const { data, status } = await axios.get('http://localhost:9009/v1/airports');
            if (status === 200 && data) {
                setAirports(data?.results ?? [])
            } else {
                setAirports([])
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getAirport()
    }, [])

    const handleChangeDepartureAirport = (e) => {
        setDepartureAirPort(e.target.value)
        if (e.target.value) {
            setErrors((err) => ({ ...err, departureAirport: false }))

        } else {
            setErrors((err) => ({ ...err, departureAirport: true }))
        }
        const filterAirportsData = airports.filter((airport) => airport.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredAirports(filterAirportsData ?? [])
    }

    const handleChangeCheckIn = (e) => {
        setCheckIn(e.target.value)

        if (e.target.value) {
            setErrors((err) => ({ ...err, checkin: false }))
        } else {
            setErrors((err) => ({ ...err, checkin: true }))
        }
    }

    const handleChangeCheckOut = (e) => {
        setCheckOut(e.target.value);
        if (e.target.value) {
            setErrors((err) => ({ ...err, checkout: false }))
        } else {
            setErrors((err) => ({ ...err, checkout: true }))
        }
        if (moment(checkin) > moment(checkout)) {
            setErrors((err) => ({ ...err, checkout: true }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (moment(checkin) > moment(checkout)) {
            setErrors((err) => ({ ...err, checkout: true }))
        }
        else if (departureAirport && checkin && checkout) {
            window.location.href = `/results?departureAirport=${departureAirport}&checkin=${checkin}&checkout=${checkout}`
        } else {
            setErrors({
                departureAirport: !departureAirport,
                checkin: !checkin,
                checkout: !checkout
            })
        }


    }

    const selectAirport =(value)=>{
        setDepartureAirPort(value)
        setFilteredAirports([])
    }


    return (
        <div className="searchbox landing">
            <div className="row tabs">
                <div className="tab">
                    <div className="heading">Most Convenient</div>
                    <div className="button">
                        <div className="icon"><i className="fas fa-car"></i></div>
                        Airport Parking Only
                    </div>
                </div>
                <div className="tab">
                    <div className="heading">Best Value</div>
                    <div className="button">
                        <div className="icon"><i className="fas fa-bed"></i> + <i
                            className="fas fa-car"></i></div>
                        Hotel &amp; Parking Package
                    </div>
                </div>
            </div>
            <form >
                <div className="options row m-0"><label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
                    <div className="heading mb-1">Departure Airport</div>
                    <div className="placeholder placeholder-airport">
                        <input name="departure-airport" value={departureAirport} onChange={handleChangeDepartureAirport} type="text" placeholder="Departure Airport" className="placeholder placeholder-airport" />
                    </div> <i className="fas fa-map-marker-alt input-icon"></i>
                    {errors && errors.departureAirport && <div className="alert alert-danger">Invalid Departure Airport</div>}
                    <AirportSuggetions airports={filteredAirports} selectAirport={selectAirport} />
                </label>
                    <div className="col p-0 row m-0 mb-2 dates"><label
                        className="col-sm-6 p-0 pr-sm-3 date_input">
                        <div className="heading mb-1">Parking Check-In</div>
                        <div className="placeholder">
                            <input
                                value={checkin}
                                onChange={handleChangeCheckIn}
                                name="checkin"
                                type="date"
                                placeholder="Parking Check-Out"
                                className="placeholder placeholder-airport"
                                style={{ width: "100%" }}

                            />
                        </div>
                        {errors && errors.checkin && <div className="alert alert-danger">Invalid checkin Date</div>}
                       
                    </label>
                        <label className="col-sm-6 p-0 pl-sm-0 date_input">
                            <div className="heading mb-1">Parking Check-Out</div>
                            <input
                                value={checkout}
                                onChange={handleChangeCheckOut}
                                name="Check-Out"
                                type="date"
                                placeholder="Parking Check-Out"
                                className="placeholder placeholder-airport"
                                style={{ width: "100%" }}
                            />
                            {errors && errors.checkout && <div className="alert alert-danger">Invalid checkout Date</div>}
                        </label>
                    </div>
                    <div className="col-12 col-xl-2 p-0 pl-xl-3 my-3 my-xl-0">
                        <div className="d-none d-xl-block heading mb-1 invisible">Submit</div>
                        <button
                            onClick={onSubmit}
                            className="btn btn-secondary btn-big btn-block p-2"><span>SEARCH</span></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const HomePage = (props) => {

    return (
        <div>
            <div className="content">
                <section id="home_page">
                    <div className="years-of-service">
                        <div className="container">
                            For 20 years, we’ve helped travelers on their way. With free cancellations & a customer
                            service team in the US, we are committed to serving you.
                        </div>
                    </div>
                    <section id="hero"
                        style={{ backgroundImage: "url('assets/generic_landing.jpg')", minHeight: "500px" }}>
                        <div className="hero-backdrop"></div>
                        <div className="container position-relative">
                            <div className="hero-heading mb-4">
                                <h1>SAVE BIG ON AIRPORT PARKING</h1>
                                <h2>We have the best deals for airport parking lots!</h2>
                            </div>
                            <SearchForm />
                        </div>
                    </section>
                    <section id="benefits">
                        <div className="container">
                            <h5>What Can You Save with AirportParkingReservations.com?</h5>

                            <ul className="row">
                                <li className="col-12 col-lg-4 p-3">
                                    <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                                    <div>
                                        <h6>Save Money</h6>
                                        <p>Save up to 70% off on our site compared to the cost of on-airport
                                            parking.</p>
                                    </div>
                                </li>
                                <li className="col-12 col-lg-4 p-3">
                                    <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                                    <div>
                                        <h6>Save Time</h6>
                                        <p>
                                            It's easy to compare parking at all major airports.<br />
                                            Booking a reservation is quick & simple!
                                        </p>
                                    </div>
                                </li>
                                <li className="col-12 col-lg-4 p-3">
                                    <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                                    <div>
                                        <h6>Save Stress</h6>
                                        <p>
                                            Guarantee your parking spot by booking in advance. Can't make it?
                                            Cancellations are free.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                </section>
            </div>
        </div>
    )
}

export default HomePage;