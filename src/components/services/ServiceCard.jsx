import React, {useState, useEffect} from "react";
import ServiceDetail from "../modal/ServiceDetails";
import { FaLeaf } from "react-icons/fa";
import Link from "next/link";

const ServiceCard = ({
    showCard,
    category,
    ImageHref,
    title,
    button,
    buttonHref,
  }) => {
      //Manejo de modal
  const [isShown, setIsShown] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleModalDetail = ()=>{
    //setIsShown(!isShown)
    console.log(buttonHref + isShown)
  }



    return (
      <>
        <div
          className={`w-full px-4 md:w-1/2 xl:w-1/3 ${
            showCard === "all" || showCard === category.toLowerCase()
              ? "block"
              : "hidden"
          }`}
        >
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-[10px]">
              <img src={ImageHref} alt="portfolio" className="w-full" />
            </div>
            <div className="relative z-10 mx-7 -mt-20 rounded-lg bg-white dark:bg-dark-2 py-[34px] px-3 text-center shadow-portfolio dark:shadow-box-dark">
              <span className="text-primary mb-2 block text-sm font-medium">
                {category}
              </span>
              <h3 className="text-dark dark:text-primary mb-5 text-xl font-bold">{title}</h3>
              <Link
              href={buttonHref}
              className="text-primary dark:text-dark-6 hover:border-primary hover:bg-primary inline-block rounded-md border border-stroke dark:border-dark-3 py-[10px] px-7 text-sm font-medium transition hover:text-white"
            >
              {button}
            </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default ServiceCard;