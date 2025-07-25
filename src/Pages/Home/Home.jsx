import React from 'react';
import useTitle from '../../Hooks/useTitle';
import PopularPolicies from '../PopularPolicies/PopularPolicies';
import LifeSureBenefits from '../../Components/LifeSureBenefits/LifeSureBenefits';

const Home = () => {
useTitle("Home");
    return (
        <div >
            <h1>home is coming..........</h1>
            <PopularPolicies></PopularPolicies>
            <LifeSureBenefits></LifeSureBenefits>
         
        </div>
    );
};

export default Home;