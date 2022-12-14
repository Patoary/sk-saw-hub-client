import React from 'react';
import Heading from '../../../Components/Heading/Heading';
import { useQuery } from 'react-query';
import Loading from '../../../Components/Loading/Loading';
import Review from './Review';
const Reviews = () => {
    
    const {data: reviews, isLoading} = useQuery('all-review', ()=> 
    fetch('https://lit-wildwood-53633.herokuapp.com/review',{
        method:'GET',
        headers:{
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    )

    if(isLoading){
        return <Loading/>
    };
    return (
        <div className='bg-gradient-to-r  from-[#00214124] to-[#19d3ae2e] py-20 px-12'>
            <div>
                <Heading>Customers Review</Heading>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>
                {
                 reviews &&   [...reviews].reverse().map((review) => <Review
                    key={review?._ids}
                    review={review}
                    ></Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;