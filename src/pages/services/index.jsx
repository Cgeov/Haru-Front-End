import React, { useState } from "react";
import Layout from "../layout";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceDetail from "@/components/modal/ServiceDetails";

const Portfolio = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category) => {
    setShowCard(category);
  };

  //Manejo de modal
  const [isShown, setIsShown] = useState(true)


  

  return (
    <>
    <Layout>
    <section className="pt-20 pb-12 lg:pt-[100px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  Nuestros Servicios
                </span>
                <h2 className="text-primary mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
                  Conoce más sobre los servicios que ofrecemos
                </h2>
                <p className="text-primary text-base dark:text-dark-6">
                En Haru los las flores son una forma de expresar sentimientos, celebrar ocasiones o decorar espacios con flores naturales. Descubre lo que tenemos para ofrecerte
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="flex flex-wrap justify-center mb-12 space-x-1">
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-primary text-white"
                        : "inactiveClasses text-primary dark:text-dark-6 hover:bg-primary hover:text-white"
                    }`}
                  >
                    Todos
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("servicios")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "servicios"
                        ? "activeClasses bg-primary text-white"
                        : "inactiveClasses text-primary dark:text-dark-6 hover:bg-primary hover:text-white"
                    }`}
                  >
                    Servicios
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("arreglos")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "arreglos"
                        ? "activeClasses bg-primary text-white"
                        : "inactiveClasses text-primary dark:text-dark-6 hover:bg-primary hover:text-white"
                    }`}
                  >
                    Arreglos
                  </button>
                </li>

              </ul>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <ServiceCard
              ImageHref="https://static.wixstatic.com/media/9807d4_e5dbdb980d654b4eaa7cace9d08ec396~mv2.jpg/v1/fill/w_450,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_e5dbdb980d654b4eaa7cace9d08ec396~mv2.jpg"
              category="Arreglos"
              title="Entrega Inmediata"
              button="Preguntanos"
              buttonHref="/quote"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://static.wixstatic.com/media/9807d4_9e720061bdd749c2ba51b424a2375530~mv2.png/v1/fill/w_450,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_9e720061bdd749c2ba51b424a2375530~mv2.png"
              category="Servicios"
              title="Decoraciones"
              button="Preguntanos"
              buttonHref="/quote"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://static.wixstatic.com/media/9807d4_507066b8f95c46bcbe5101d966e37fa2~mv2.png/v1/fill/w_450,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_507066b8f95c46bcbe5101d966e37fa2~mv2.png"
              category="Arreglos"
              title="Canastas"
              button="Preguntanos"
              buttonHref="/quote"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://static.wixstatic.com/media/9807d4_aff958e048bb403c9c7c7bd452cc010b~mv2.jpg/v1/fill/w_450,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_aff958e048bb403c9c7c7bd452cc010b~mv2.jpg"
              category="Servicios"
              title="Arreglos Funebres"
              button="Preguntanos"
              buttonHref="/quote"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://static.wixstatic.com/media/9807d4_9c5765a74e28491d82fabdeb278bd9b1~mv2.png/v1/fill/w_450,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_9c5765a74e28491d82fabdeb278bd9b1~mv2.png"
              category="Servicios"
              title="Bodas"
              button="Preguntanos"
              buttonHref="/quote"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://static.wixstatic.com/media/9807d4_e5bb9869dbe24dee9f7bb239aeeffe9a~mv2.jpg/v1/fill/w_450,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_e5bb9869dbe24dee9f7bb239aeeffe9a~mv2.jpg"
              category="Arreglos"
              title="Arreglos con base"
              button="Preguntanos"
              buttonHref="/quote"
              showCard={showCard}
            />
          </div>
        </div>
      </section>
    </Layout>

    </>
  );
};

export default Portfolio;


