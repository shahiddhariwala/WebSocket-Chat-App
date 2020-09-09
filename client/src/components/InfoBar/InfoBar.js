import React from 'react';
import "./InfoBar.css";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";


const InfoBar = (props) => {
    return (
        <>
            <div className="infoBar">
                <div className="leftInnerContainer">
                    <img className="onlineIcon" src={onlineIcon} alt="Online Icon" />
                    <h3>
                        {props.room}
                    </h3>
                </div>
                <div className="rightInnerContainer">
                    <a href="/">
                        <img className="closeIcon" src={closeIcon} alt="Close Icon" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default InfoBar;