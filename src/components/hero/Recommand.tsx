import React from 'react';
import { Title } from '../common/Title';
import { Card_sm } from '../common/Card_sm';

interface ItemRecommand {
    id: number;
    name: string;
    tag: string;
    cover: string;
}

export const Recommand = () => {
    const recommand : ItemRecommand[] = [
        {
          id: 1,
          name: "Simple Place To Be",
          tag: "RYD",
          cover: "../images/b1.jpg",
        },
        {
          id: 2,
          name: "Reflection (Deluxe)",
          tag: "Fifth Harmony",
          cover: "../images/b2.jpg",
        },
        {
          id: 3,
          name: "The Open Road",
          tag: "Postiljonen",
          cover: "../images/b3.jpg",
        },
        {
          id: 4,
          name: "Body on me",
          tag: "Rita Ora",
          cover: "../images/b4.jpg",
        },
        {
          id: 5,
          name: "I Wanna Be In the Cavalry",
          tag: "Jeremy Scott",
          cover: "../images/b5.jpg",
        },
        {
          id: 6,
          name: "Pull Up",
          tag: "Summerella",
          cover: "../images/b6.jpg",
        },
        {
          id: 7,
          name: "What A Time To Be Alive",
          tag: "Judith Garcia",
          cover: "../images/b7.jpg",
        },
        {
          id: 8,
          name: "Live Radio",
          tag: "Radionomy",
          cover: "../images/b8.jpg",
        },
        {
          id: 9,
          name: "What A Time To Be Alive",
          tag: "Judith Garcia",
          cover: "../images/b3.jpg",
        },
        {
          id: 10,
          name: "Live Radio",
          tag: "Radionomy",
          cover: "../images/b2.jpg",
        },
      ];
  return (
    <div>
        <section className="recommand hero mt-7 pb-32">
        <Title title="Recommand for you" />
        {/* <Slider {...settings}> */}
        <div className="grid grid-cols-2 gap-5">
          {recommand.map((item, i) => (
            <div className="box card hero" key={i}>
              <Card_sm id={item.id} urlAvatar={item.cover} name={item.name} tag={item.tag} i={i} show={false}/>
            </div>
          ))}
        </div>
        {/* </Slider> */}
      </section>
    </div>
  )
}
