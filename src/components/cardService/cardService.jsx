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
        description: "¿Estás buscando una forma de darle un toque especial a tu evento? Ya sea una boda, un cumpleaños, un aniversario o cualquier otra ocasión, los arreglos florales son una excelente opción para decorar y crear un ambiente único. En nuestra empresa, te ofrecemos servicios de arreglos florales para diferentes eventos, centros de mesa, ramos, arcos florales y más. Contactanos y conoce las maneras de personalizar los arreglos",
        image: images[0]
    },
    {
        title: "Eventos",
        description: "¿Estás buscando una forma de darle un toque especial a tu evento? Ya sea un cumpleaños, un aniversario o cualquier otra ocasión, los arreglos florales son una excelente opción para decorar y crear un ambiente único. En nuestra empresa, te ofrecemos servicios de arreglos florales para diferentes eventos, centros de mesa, ramos, arcos florales y más.",
        image: images[1]
    },
    {
        title: "Funebre",
        description: "Ofrecemos una gran variedad de opciones para honrar la memoria de tus seres queridos. Podrás elegir entre diferentes tipos de flores, colores, tamaños y formas, y personalizar tu arreglo como desees, ponte en contacto con nosotros para saber disponibilidad y precio de los arreglos personalizados. Nuestros precios son muy competitivos, y nuestra calidad es inmejorable.",
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
                                    <Link href={"/quote"} class="w-full">
                                    <button className="rounded-md bg-primary py-3 px-6 text-white font-bold" >Ver más</button>
                                    </Link>
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