'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import ChemmistCard from '../components/chemist_card';

//------// Media //------//
import SearchIcon from '../media/svgs/search-normal.svg';
import CategoryIcon from '../media/svgs/category_grid.svg';
import SortIcon from '../media/svgs/sort.svg';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';

const users_data = [
    {
        id: 0,
        username: "Jessica Jane",
        user_role: "Chemist",
        user_status: "Connected",
        userDescription: "Hi, I'm Jessica Jane. Lorem Ipsum is simply dummy text of the printing and typesetting",
        tasks_number: "40",
        task_name: "Task",
        rating_from_five: "4.7",
        reviews_total: "750",
    },
    {
        id: 1,
        username: "Abraham Lincoln",
        user_role: "Chemist",
        user_status: "Connected",
        userDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non illo excepturi ipsa rem! Culpa nesciunt incidunt obcaecati nulla, quo aperiam!",
        tasks_number: "32",
        task_name: "Task",
        rating_from_five: "4,9",
        reviews_total: "510",
    },
    {
        id: 2,
        username: "Curious George",
        user_role: "Chemist",
        user_status: "Connected",
        userDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non illo excepturi ipsa rem! Culpa nesciunt incidunt obcaecati nulla, quo aperiam!",
        tasks_number: "40",
        task_name: "Tasks",
        rating_from_five: "4.7",
        reviews_total: "750",
    },
    {
        id: 3,
        username: "Alex Stanton",
        user_role: "Chemist",
        user_status: "Chat",
        userDescription: "Hi, I'm Alex Stanton. Lorem Ipsum is simply dummy text of the printing and typesetting etc",
        tasks_number: "60",
        task_name: "Task",
        rating_from_five: "4.7",
        reviews_total: "970",
    },
    {
        id: 4,
        username: "Anna White",
        user_role: "Chemist",
        user_status: "Chat",
        userDescription: "Hi, I'm Anna White.Lorem Ipsum is simply dummy text of the printing and typesetting...",
        tasks_number: "60",
        task_name: "Medicines",
        rating_from_five: "4,8",
        reviews_total: "870",
    },
    {
        id: 5,
        username: "Richard Kyle",
        user_role: "Chemist",
        user_status: "Chat",
        userDescription: "Hi, I'm Richard Kyle. Lorem Ipsum is simply dummy text of the printing and typesetting etc",
        tasks_number: "60",
        task_name: "Task",
        rating_from_five: "4,7",
        reviews_total: "730",
    },
]

export default function HedronConnect() {
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=hadron-connect`);
    if (loading) return;
    if (error) return; 
    return (
        <div className="hadron_connect"> 
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                {data[0].acf.page_paragraph}
                </p>
            )}
            <div className="form_filter">
                <div className="search_container">
                    <SearchIcon />
                    <input type="text" placeholder='Search  Chemists ' />
                </div>
                <div className="filter_options">
                    <div className="f_option"><CategoryIcon /> Category</div>
                    <div className="f_option"><SortIcon /> Sort By : <span>Popular</span></div>
                </div>
            </div>
            <section className='slider_first'>
                <h2>Your  Connection</h2>
                <Swiper
                    spaceBetween={32}
                    slidesPerView={2.5}
                >
                    {users_data.map((user_inf) => (
                        user_inf.user_status == "Connected" ? (
                            <SwiperSlide>
                                <ChemmistCard 
                                    key={user_inf.id}
                                    username={user_inf.username}
                                    user_role={user_inf.user_role}
                                    user_status={user_inf.user_status}
                                    tasks_number={user_inf.tasks_number}
                                    task_name={user_inf.task_name}
                                    rating_from_five={user_inf.rating_from_five}
                                    reviews_total={user_inf.reviews_total}
                                />
                            </SwiperSlide>
                        ) : null
                    ))}
                </Swiper>
            </section>
            <section>
                <h2>All Chemists</h2>
                <div className="chemists_grid"> 
                    {users_data.map((user_inf) => (
                        <ChemmistCard 
                            key={user_inf.id}
                            username={user_inf.username}
                            user_role={user_inf.user_role}
                            user_status={user_inf.user_status}
                            userDescription={user_inf.userDescription}
                            tasks_number={user_inf.tasks_number}
                            task_name={user_inf.task_name}
                            rating_from_five={user_inf.rating_from_five}
                            reviews_total={user_inf.reviews_total}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}