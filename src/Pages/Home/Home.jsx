import React from 'react';
import useTitle from '../../Hooks/useTitle';
import PopularPolicies from '../PopularPolicies/PopularPolicies';
import LifeSureBenefits from '../../Components/LifeSureBenefits/LifeSureBenefits';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import LatestBlogs from './LatestBlogs/LatestBlogs';
import NewsletterForm from './NewStaller/NewsletterForm ';
import MeetOurAgents from './MeetAgents/MeetOurAgents';


const Home = () => {
useTitle("Home");
    return (
        <div >
            <h1>home is coming..........</h1>
            <PopularPolicies></PopularPolicies>
            <LifeSureBenefits></LifeSureBenefits>
            <CustomerReviews></CustomerReviews>
            <LatestBlogs></LatestBlogs>
            <MeetOurAgents></MeetOurAgents>
            <NewsletterForm></NewsletterForm>
         
        </div>
    );
};

export default Home;