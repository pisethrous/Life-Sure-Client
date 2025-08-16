import React from 'react';
import useTitle from '../../Hooks/useTitle';
import PopularPolicies from '../PopularPolicies/PopularPolicies';
import LifeSureBenefits from '../../Components/LifeSureBenefits/LifeSureBenefits';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import LatestBlogs from './LatestBlogs/LatestBlogs';
import NewsletterForm from './NewStaller/NewsletterForm ';
import MeetOurAgents from './MeetAgents/MeetOurAgents';
import Banner from '../../Components/Banner/Banner';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import Promo from './Promo/Promo';


const Home = () => {
useTitle("Home");
    return (
        <div >
            <Banner></Banner>
            <PopularPolicies></PopularPolicies>
            <LifeSureBenefits></LifeSureBenefits>
           
            <LatestBlogs></LatestBlogs>
            <WhyChooseUs></WhyChooseUs>
              <Promo></Promo>
             <CustomerReviews></CustomerReviews>
            <MeetOurAgents></MeetOurAgents>
           
            <NewsletterForm></NewsletterForm>
         
        </div>
    );
};

export default Home;