import React from 'react'
import '../static/css/itemnews.scss'
interface ItemnewsProps {
    title: string;
    desc: string;
    img: string;
    time: string;
}
const Itemnews: React.FC<ItemnewsProps> = ({ title, desc, time, img }) => {


    return (
        <div>
            <div className="item-news">
                <div className="item-news-img">
                    <img src={img} alt="news" />
                </div>
                <div className="item-news-content">
                    <h3 className="item-news-title" >{title}</h3>


                    <p className="item-news-time">{time}</p>
                    <p className="item-news-desc" dangerouslySetInnerHTML={{ __html: desc || "" }} ></p>
                </div>

            </div>
        </div>
    )
}

export default Itemnews