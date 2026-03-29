import React from "react";
import Carditem from "./Carditem";
import './Cards.css';

function Cards (){
    return (
        <div className="cards">
            <h1>Check out New Zealand</h1>
            <div className  = "cards__container">
                <div className = "cards__wrapper">
                    <ul className = "cards__items">
                        <Carditem 
                        src = "images/auckland1.jpg"
                        text = "Auckland dazzles with harbors, skyline views, and endless adventures—perfect for any traveler"
                        label = "Auckland"
                        path = '/services'
                    />
                    <Carditem 
                        src = "images/wellington1.jpg"
                        text = "Wellington charms with vibrant culture, scenic harbors, and lively streets—New Zealand’s creative capital"
                        label = "Wellington"
                        path = '/services'
                    />
                    </ul>
                    <ul className = "cards__items">
                        <Carditem 
                        src = "images/img-9.jpg"
                        text = "Explore the hidden waterfall deep inside the Amazon Jungle"
                        label = "Adventure"
                        path = '/services'
                    />
                    <Carditem 
                        src = "images/img-2.jpg"
                        text = "Travel through the Islands of Bali in a Private Cruise"
                        label = "Luxury"
                        path = '/services'
                    />
                    <Carditem 
                        src = "images/img-2.jpg"
                        text = "Travel through the Islands of Bali in a Private Cruise"
                        label = "Luxury"
                        path = '/services'
                    />
                    <Carditem 
                        src = "images/img-2.jpg"
                        text = "Travel through the Islands of Bali in a Private Cruise"
                        label = "Luxury"
                        path = '/services'
                    />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;