import React, {useState} from 'react'
import "./footer.css"
import PadelFooter from '../images/Artboard-1@11x-1.png'
import JustPadelName from '../images/Just-Padel-Black-Font-Logo.png'
import Visa from '../images/Untitled-3-01.png'
import Apple from '../images/Apple-Store-large-pcfm03us8azjxack9xwpyxnx768wodmkdq11834x1e.png'
import Android from '../images/Google-Play-large-pcfm0ztaoo7aw1253bq1bplle9vdy35fu47jjhtj5u.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faMapMarkerAlt, faPhone, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import GoogleMapReact from 'google-map-react';
library.add(fab)

const Footer = () => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    const AnyReactComponent = ({text}) => <div>{text}</div>;
    return (
        <div>
        <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={11.0168}
                        lng={76.9558}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>

            <div className="footer-container">
                <div className="inner-footer">
                    <div className="footer-details">
                        <img src={PadelFooter} alt="padel-footer.jpg" className="PadelFooter" />
                        <img src={JustPadelName} alt="padel-footer.jpg" className="JustPadelName" />
                        <div className="social-icons">
                            <div className="social-circle">
                                <FontAwesomeIcon icon={["fab", "facebook"]} className="circleIcon" />
                            </div>
                            <div className="social-circle">
                                <FontAwesomeIcon icon={["fab", "instagram"]} className="circleIcon" />
                            </div>
                            <div className="social-circle">
                                <FontAwesomeIcon icon={["fab", "snapchat"]} className="circleIcon" />
                            </div>
                            <div className="social-circle">
                                <FontAwesomeIcon icon={["fab", "linkedin"]} className="circleIcon" />
                            </div>
                            <div className="social-circle">
                                <FontAwesomeIcon icon={["fab", "youtube"]} className="circleIcon" />
                            </div>

                        </div>
                    </div>
                    <div className="footer-details">
                        <div className="relate-link">
                            <h1>Quick Links</h1>
                        </div>
                        <div className="child-link-container">
                            <div className="child-link">
                                <h5>Home</h5>
                                <h5>About Us</h5>
                                <h5>Contact Us</h5>
                                <h5>Browse Events</h5>
                                <h5>Careers</h5>
                            </div>
                            <div className="child-link">
                                <h5>Blog</h5>
                                <h5>Locations</h5>
                                <h5>Invest With Us</h5>
                                <h5>Dilivery Policy</h5>
                                <h5>Legal Notice</h5>
                            </div>
                        </div>
                    </div>
                    <div className="footer-details">
                        <div className="relate-link">
                            <h1>Contact US</h1>
                        </div>
                        <div className="footer-info">
                            <div className="child-info">
                                <div className="info-icons">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="infoIcon" />
                                </div>
                                <h5>Head Office: Just Play Sports Complex, 15A Street, Al Quoz Industrial 1 - Dubai</h5>
                            </div>
                            <div className="child-info">
                                <div className="info-icons">
                                    <FontAwesomeIcon icon={faPhone} className="infoIcon" />
                                </div>
                                <div className="info-contact">
                                    <h4>+971 55 9928 022</h4>
                                    <h4>+971 4 546 3800</h4>
                                </div>

                            </div>
                            <div className="child-info">
                                <div className="info-icons">
                                    <FontAwesomeIcon icon={faEnvelopeOpen} className="infoIcon" />
                                </div>
                                <h5>info@justpadel.ae</h5>
                            </div>

                        </div>
                    </div>
                </div>

                <hr className="footer-Line" />
                <div className="cpyright-container ">
                    <div className="inner-cpy-right">
                        <h5>Just Padel ©2021. All Rights Reserved.</h5>
                        <div className="conditions">
                            <h4>Privacy Policy</h4>
                            <h4>Terms of Service</h4>
                            <h4>Cancellation & Refund Policy</h4>
                            <img src={Visa} alt="" />
                        </div>
                    </div>
                    <div className="stores">
                        <img src={Apple} alt="" />
                        <img src={Android} alt="" />
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Footer;
