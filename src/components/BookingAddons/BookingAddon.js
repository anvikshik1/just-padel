import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import './bookingAddon.css';
import Navbar from '../Navbar/Navbar';
import axios from '../../CustomAxios';
import { environment } from '../../env';
import _ from "lodash";

function BookongList(props) {

  const inititalUserSelection = {
    addonSelection: [
      { id: 1, price: '', qty: 0, isChecked: false },
      { id: 2, price: '', qty: 0, isChecked: false },
      { id: 3, price: '', qty: 0, isChecked: false },
    ],
    vat: '1.05',
    coupon: '',
  };

  const [state, setstate] = useState([]);
  const [addonList, setAddonList] = useState([]);
  const [amount, setAmount] = useState(250);
  const [finalAmount, setFinalAmount] = useState();
  const [userSelection, setUserSelection] = useState(inititalUserSelection);
  const [reloadState, setReloadState] = useState(false);
  const [userCartDetails, setUserCartDetails] = useState([
    {
      "court": "",
    }
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeValidationMsg, setCouponCodeValidationMsg] = useState('');
  const [couponValue, setCouponValue] = useState(0);
  const [discountPrice, setdiscountPrice] = useState();
  const [totalAmountWithoutVAT, setTotalAmountWithoutVAT] = useState();
  const [vatAmount, setVatAmount] = useState();

  const addonListUrl = `${environment.baseUrl}addon`;
  const history = useHistory();
  const getAddons = async () => {
    const result = await axios(addonListUrl);
    setAddonList(result.data);
    return result.data;
  };

  function calcTotalAmount(initialPrice, selectionFinal) {
    const selections = selectionFinal ? selectionFinal : userSelection;
    setUserSelection(selections);
    let total = initialPrice ? initialPrice : totalAmount;
    // addon calculations.
    selections.addonSelection.forEach((addon) => {
      total += (addon.price * addon.qty);
    });
    // coupon discount.
    console.log("Total Amount", total);
    console.log("VAT Applied", ((total / 100) * 5));

    setTotalAmountWithoutVAT(total);
    setVatAmount(((total / 100) * 5));
    total -= (total * (selections.coupon));
    // vat calc
    total *= parseFloat(selections.vat).toFixed(2);
    setFinalAmount(total.toFixed(2));
    setReloadState(!reloadState);
    // setdiscountPrice(((total / 100) * couponValue*100).toFixed(2));
    // console.log("Discounted Amount",((total / 100) * couponValue*100).toFixed(2));
    setReloadState(!reloadState);
  }

  /* eslint-disable no-param-reassign */
  function handleCheck(id) {
    const addonCopy = userSelection;
    addonCopy.addonSelection.forEach((addon) => {
      if (addon.id === id) {
        addon.isChecked = !addon.isChecked;
        addon.qty = addon.isChecked ? 1 : 0;
      }
    });
    setUserSelection(addonCopy);
    calcTotalAmount();
  }

  function handlePlus(id) {
    const addonCopy = userSelection;
    addonCopy.addonSelection.forEach((addon) => {
      if (addon.id === id && addon.isChecked) {
        addon.qty++;
      }
    });
    setUserSelection(addonCopy);
    calcTotalAmount();
  }

  function handleMinus(id) {
    const addonCopy = userSelection;
    addonCopy.addonSelection.forEach((addon) => {
      if (addon.id === id && addon.isChecked) {
        addon.qty--;
      }
    });
    setUserSelection(addonCopy);
    calcTotalAmount();
  }

  function callCouponValidate(cCode, userSelectionParam) {
    try {
      const userId = localStorage.getItem('UserId');
      if (cCode !== '') {
        const validateCouponUrl = `${environment.baseUrl}validate_coupon`;
        const data = {
          name: cCode,
          user: userId
        }
        const result = axios.post(validateCouponUrl, data)
          .then((response) => {
            if (response?.data?.percentage_of_discount) {
              setUserSelection({ ...userSelectionParam, coupon: (response?.data?.percentage_of_discount / 100) });
              setCouponCodeValidationMsg("");
            } else {
              setCouponCodeValidationMsg(response?.data?.msg);
            }
          },
            (err) => {
              setCouponCodeValidationMsg("Coupon entered is not valid.");
            })
      }
    } catch (error) {
      setCouponCodeValidationMsg("Error processing your Request.");
    }
  }

  function handleCoupanCodeChange(event) {
    setCouponCode(event.target.value);
    debounce(event.target.value, userSelection);
  };

  const debounce = useCallback(
    _.debounce((_searchVal, userSelectionParam) => {
      callCouponValidate(_searchVal, userSelectionParam);
      // send the server request here		
    }, 500),
    []
  );

  const applyCouponCode = async () => {
    if (userSelection.coupon) {
      setCouponValue(userSelection.coupon);
      calcTotalAmount();
      setCouponCodeValidationMsg("Discount applied successfully!!");
    }
  }
  const removeCouponCode = async () => {
    let userSelectionCopy = userSelection;
    userSelectionCopy.coupon = 0;
    setUserSelection(userSelectionCopy);
    setCouponValue(0);
    setCouponCode("");
    setCouponCodeValidationMsg("");
    calcTotalAmount();
  }

  const getUserCartDetails = async () => {
    const userId = localStorage.getItem('UserId');
    const userCartUrl = `${environment.baseUrl}get_cart_user/${userId}`;
    console.log(userCartUrl);
    const result = await axios(userCartUrl)
      .then((response) => {
        const cartTimeslots = JSON.parse(response?.data?.data[0].timeslot.replace(/'/g, '"'));
        // console.log("Response of Data", cartTimeslots);
        if (cartTimeslots.length > 0) {
          const totalAmount = cartTimeslots.reduce((a, b) => ({ price: a.price + b.price }));
          setTotalAmount(totalAmount.price);
          setUserCartDetails(cartTimeslots);
          setReloadState(!reloadState);
          setUserSectionFromPreviousPage(totalAmount.price);
        }
      });
  };

  const setUserSectionFromPreviousPage = async (initialPrice) => {
    const modifiedAddon = [];
    let previousPageSelection = '';
    let addonsFromDb = '';
    const tempUserSelection = userSelection.addonSelection;
    previousPageSelection = JSON.parse(localStorage.getItem('selectionDetails'));
    await getAddons().then((value) => {
      addonsFromDb = value;
    });
    addonsFromDb.forEach((apiAddon) => {
      modifiedAddon.push({
        id: apiAddon.id,
        price: apiAddon.price,
        qty: 0,
        addonname: apiAddon.addonname,
        description: apiAddon.description,
        isChecked: false,
      });
    });
    const selectionFinal = {
      courtPrice: initialPrice,
      addonSelection: modifiedAddon,
      vat: userSelection.vat,
      coupon: userSelection.coupon,
    };
    setUserSelection(selectionFinal);
    setReloadState(!reloadState);
    calcTotalAmount(initialPrice, selectionFinal);
  };


  const onDeleteCourt = (mId, pdId, ts, dt) => {
    console.log("main court ID : ", mId);
    console.log("padel court id: ", pdId);
    console.log("tileslot: ", ts);
    console.log(" date:", dt);
    let existingCartDetails = userCartDetails;
    const userId = localStorage.getItem('UserId');
    console.log("before filter: ", existingCartDetails);
    existingCartDetails = existingCartDetails.filter((s) => {
      return !(s.maincourt == mId && s.court == pdId && s.timeslot == ts && s.booking_date == dt);
    });
    console.log("existingCartDetails: ", existingCartDetails);
    setUserCartDetails(existingCartDetails);
    try {
      const deleteCartPayload = {
        "main_court_id": mId,
        "court_id": pdId,
        "court_name": pdId,
        "timeslot": ts,
        "date": dt,
        "price": "0",
        "selected_slot": JSON.stringify(existingCartDetails),
        "user": userId
      }
      const addToCartUrl = `${environment.baseUrl}addtocart`;
      const result = axios.post(addToCartUrl, deleteCartPayload)
        .then((response) => {
          console.log("response: ", response);
          alert("Selected court deleted!");
          if (existingCartDetails.length !== 0) {
            setTotalAmount(existingCartDetails.reduce((a, b) => ({ price: a?.price + b?.price })));
          } else {
            setTotalAmount(0);
          }
          setReloadState(!reloadState);
        }, (error) => {
          console.log("Promise error: ", error);
        })
    } catch (error) {
      console.log("add to cart error: ", error);
    }
  };
  useEffect(() => {
    getUserCartDetails();
  }, []);

  const addToCartApiPayload = () => {
    const userId = localStorage.getItem('UserId');
    const payload = {
      "court_id": userCartDetails[0].court,
      "date": userCartDetails[0].booking_date,
      "price": finalAmount,
      "selected_slot": JSON.stringify([]), //emptying cart.
      "user": userId
    }
    let addOns = []
    userSelection.addonSelection?.map((item) => {
      if (item.isChecked) {
        addOns.push(`${item.id}-${item.qty}`)
      }
    })
    if (addOns?.length > 0) {
      payload['addon'] = addOns.join(',')
    }
    console.log("===============================================================================")
    console.log("cart payload", payload);
    localStorage.setItem("cart_payload", JSON.stringify(payload));
    console.log("===============================================================================")
    // storebooking cart payload.
    bookCourt();
  }

  const bookCourt = () => {
    const userId = localStorage.getItem('UserId');
    console.log("userCartDetails : ", userCartDetails)
    const payload = {
      "slots": userCartDetails,
      "user": userId,
      "coupon_code": couponCode,
      "amount_paid": finalAmount,
      "payment_status": "Completed",
    }
    let addOns = []
    userSelection.addonSelection?.map((item) => {
      if (item.isChecked) {
        addOns.push(`${item.id}-${item.qty}`)
      }
    })
    if (addOns?.length > 0) {
      payload['addon'] = addOns.join(',')
    }
    console.log("Booking payload", payload);
    localStorage.setItem("booking_payload", JSON.stringify(payload));
  }
  const handleCustomerDetailsPage = () => {
    addToCartApiPayload();
    history.push('/customer-details');
  };
  const handleBackButton = () => {
    history.goBack();
  }

  return (
    <div>
      <Navbar />



      <div className="calender-Container">
        <div className="inner-calender">
          <div className="inner-lhs">
            <div className="my-court-head">
              <h2>Just Padel - My Cart</h2>
            </div>
            <div className="my-court">
              {userCartDetails[0]?.court ?
                userCartDetails && userCartDetails.map((addToCartPayload) => (
                  <div className="myCourt-inner-container">
                    <div className="myCourt-details" >
                      <h5 className="court-numbers">{addToCartPayload?.maincourt_name} - Court {addToCartPayload?.court}</h5>
                      <h5 class="court-timing">{addToCartPayload?.booking_date}</h5>
                      <h5 class="court-timing">{addToCartPayload?.timeslot}</h5>
                      <h5 class="court-timing">{`AED ${addToCartPayload?.price}`}</h5>
                    </div>
                    <div>
                      <button className="remove-btn" onClick={() => onDeleteCourt(addToCartPayload?.maincourt, addToCartPayload?.court, addToCartPayload?.timeslot, addToCartPayload?.booking_date)}><FontAwesomeIcon icon={faTrashAlt} className="faTrashAlt" /> Remove</button>
                    </div>
                  </div>
                ))
                :
                <div className="addon">
                  <div className="addon-details">
                    <h6 style={{ fontFamily: "Verdana, sans-serif", fontSize: 15 }}>No court added to cart.</h6>
                  </div>
                </div>
              }
            </div>

            <div className="my-court-head">
              <h2>Add On's</h2>
            </div>
            <div className="addons">
              {
                userSelection && userSelection.addonSelection.map((data) => (
                  <div className="addons-content">
                    <div className="inner-addons">
                      <input name="isGoing" type="checkbox" onClick={() => handleCheck(data.id)} />
                      <div className="rents">
                        <h2>{data.addonname}</h2>
                        <small>({data.description})</small>
                        <h3>Qty.</h3>
                      </div>
                    </div>
                    <div className="addons-minuts">
                      <h4>AED {data.price}</h4>
                      <div className="select-minuts">
                        <FontAwesomeIcon icon={faMinusCircle} className="faMinus" onClick={() => handleMinus(data.id)} />
                        <small>{data.qty}</small>
                        <FontAwesomeIcon icon={faPlusCircle} className="faPlus" onClick={() => handlePlus(data.id)} />
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>


          <div className="inner-rhs">
            <div className="coupan-code">
              <div className="my-court-head-rhs">
                <h2>Apply Coupon Code</h2>
              </div>
              <div className="coupan-input">
                <input type="text" placeholder="Coupan code" value={couponCode} onChange={handleCoupanCodeChange} />
                {!couponValue ? <button onClick={applyCouponCode}> Apply </button> : <button onClick={removeCouponCode}>Remove</button>}
              </div>
              <div>
                {couponCodeValidationMsg ?
                  <div className="form__form-group-label" style={{ fontSize: 15, }}>{couponCode} - {couponCodeValidationMsg}</div>
                  : ""}
              </div>
              <div></div>
              <div className="my-court-head-rhs">
                <h2>Total Amount</h2>
              </div>
              <div className="total-amount">
                <div className="total-details">
                  <div>Amount</div>
                  <div>AED {totalAmountWithoutVAT}</div>
                </div>
                <div className="total-details">
                  <div>VAT 5%</div>
                  <div>AED {vatAmount}</div>
                </div>
                <div className="total-details">
                  <div>Total Amount</div>
                  <div>AED {finalAmount}</div>
                </div>
                <div className="total-details">
                  <div>Discounted price</div>
                  <div>AED {(totalAmountWithoutVAT+vatAmount-finalAmount).toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="submit-btns">
              <button className="add" onClick={handleBackButton}>Back</button>
              <button className="cancel" onClick={handleCustomerDetailsPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookongList


