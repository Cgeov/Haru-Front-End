import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

const services = [
    {
        title: "Bodas",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae bibendum varius dictumst consectetur non ullamcorper massa. Bibendum libero urna semper ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae bibendum varius dictumst consectetur non ullamcorper massa. Bibendum libero urna semper ornare.",
        image: images[0]
    },
    {
        title: "Bodas",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae bibendum varius dictumst consectetur non ullamcorper massa. Bibendum libero urna semper ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae bibendum varius dictumst consectetur non ullamcorper massa. Bibendum libero urna semper ornare.",
        image: images[1]
    },
    {
        title: "Bodas",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae bibendum varius dictumst consectetur non ullamcorper massa. Bibendum libero urna semper ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae bibendum varius dictumst consectetur non ullamcorper massa. Bibendum libero urna semper ornare.",
        image: images[2]
    }
]

export default function CardService(){
    const responsiveSettings = [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ];
    return (
        <div className="py-10 px-5">
            <Slide slidesToScroll={1} slidesToShow={1} responsive={responsiveSettings}>
                {
                    services.map((service, index)=>{
                        return(
                            <div className="px-[20px]" key={index}>
                            <div className="each-slide-effect flex">
                                <div className="flex flex-col gap-20 pr-5">
                                    <h3 className="text-primary text-5xl">{service.title}</h3>
                                    <p className="text-primary">{service.description}</p>
                                    <button className="rounded-md bg-primary py-3 px-6 text-white font-bold">Ver más</button>
                                </div>
                                <div>
                                    <img className="h-[100%]" src={service.image} alt={service.title}></img>
                                </div>
                            </div>
                            </div>
                        )
                    })
                }
            </Slide>
        </div>
      );
      
}