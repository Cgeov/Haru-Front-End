import Image from "next/image";
import Link from "next/link";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

const images = [
    "https://i.pinimg.com/736x/ee/50/83/ee5083836b7fba86ea032ce5d5a27d8f.jpg",
    "https://poga.mx/wp-content/uploads/2022/04/curso-eventos-galeria-1.jpg",
    "https://previsionexequialcolombia.com.co/wp-content/uploads/2021/08/arreglos-funebres-viena.jpeg",
];

const services = [
    {
        title: "Bodas",
        description: "¿Estás buscando una forma de darle un toque especial a tu evento? Ya sea una boda, un cumpleaños, un aniversario o cualquier otra ocasión, los arreglos florales son una excelente opción para decorar y crear un ambiente único. En nuestra empresa, te ofrecemos servicios de arreglos florales para diferentes eventos, centros de mesa, ramos, arcos florales y más.",
        image: "https://i.pinimg.com/736x/ee/50/83/ee5083836b7fba86ea032ce5d5a27d8f.jpg"
    },
    {
        title: "Eventos",
        description: "¿Estás buscando una forma de darle un toque especial a tu evento? Ya sea un cumpleaños, un aniversario o cualquier otra ocasión, los arreglos florales son una excelente opción para decorar y crear un ambiente único. En nuestra empresa, te ofrecemos servicios de arreglos florales para diferentes eventos, centros de mesa, ramos, arcos florales y más.",
        image: "https://poga.mx/wp-content/uploads/2022/04/curso-eventos-galeria-1.jpg"
    },
    {
        title: "Funebre",
        description: "Ofrecemos una gran variedad de opciones para honrar la memoria de tus seres queridos. Podrás elegir entre diferentes tipos de flores, colores, tamaños y formas, y personalizar tu arreglo como desees, ponte en contacto con nosotros para saber disponibilidad y precio de los arreglos personalizados. Nuestros precios son muy competitivos, y nuestra calidad es inmejorable.",
        image: "https://previsionexequialcolombia.com.co/wp-content/uploads/2021/08/arreglos-funebres-viena.jpeg"
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
            <Slide autoplay={false} slidesToScroll={1} slidesToShow={1} responsive={responsiveSettings}>
                {
                    services.map((service, index)=>{
                        return(
                            <div className="px-[20px] h-[100%] max-h-[600px] pb-[10px]" key={index}>
                            <div className="each-slide-effect flex gap-[3%] h-[100%]">
                                <div className="flex flex-col justify-between w-[45%] min-w-[190px]">
                                    <h3 className="text-primary text-5xl">{service.title}</h3>
                                    <p className="text-primary">{service.description}</p>
                                    <Link href={"/quote"} className="w-full">
                                        <button className="w-full rounded-md bg-primary py-3 px-6 text-white font-bold hover:bg-secondary" >Ver más</button>
                                    </Link>
                                </div>
                                <div className="w-[50%]">
                                    <img className="h-[100%] w-[100%]" src={service.image} alt={service.title}></img>
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