import React from 'react';
import Banner from './Banner';
import WhyDonate from './WhyDonate';
import DonationProcess from './DonationProcess';
import FeaturedStories from './FeaturedStories';
import UrgentRequests from './UrgentRequests';
import ContactUs from './ContactUs';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyDonate></WhyDonate>
            <DonationProcess></DonationProcess>
            <FeaturedStories></FeaturedStories>
            <UrgentRequests></UrgentRequests>
            <ContactUs></ContactUs>
            
        </div>
    );
};

export default Home;