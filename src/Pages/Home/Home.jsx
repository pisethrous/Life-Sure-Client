import React from 'react';
import useTitle from '../../Hooks/useTitle';
import PopularPolicies from '../PopularPolicies/PopularPolicies';

const Home = () => {
useTitle("Home");
    return (
        <div >
            <h1>home is coming..........</h1>
            <PopularPolicies></PopularPolicies>
         
        </div>
    );
};

export default Home;