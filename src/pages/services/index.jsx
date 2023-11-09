import React, { useState } from "react";
import Layout from "../layout";
import ServiceCard from "@/components/services/service";
import ServiceDetail from "@/components/services/service-detail";

const Portfolio = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category) => {
    setShowCard(category);
  };

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
              ImageHref="https://i.ibb.co/64WfFPt/image-01.jpg"
              category="Arreglos"
              title="Entrega Inmediata"
              button="Detalles"
              buttonHref="/quote"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://i.ibb.co/PT7ghRs/image-06.jpg"
              category="Servicios"
              title="Decoraciones"
              button="Detalles"
              buttonHref="/ServiceDetail"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://i.ibb.co/vkt8C1P/image-02.jpg"
              category="Arreglos"
              title="Canastas"
              button="Detalles"
              buttonHref="#"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://i.ibb.co/3FKqS1G/image-03.jpg"
              category="Servicios"
              title="Arreglos Funebres"
              button="Detalles"
              buttonHref="#"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://i.ibb.co/m6dq2fX/image-04.jpg"
              category="Servicios"
              title="Bodas"
              button="Detalles"
              buttonHref="#"
              showCard={showCard}
            />
            <ServiceCard
              ImageHref="https://i.ibb.co/mCPjBsH/image-05.jpg"
              category="Arreglos"
              title="Arreglos con base"
              button="Detalles"
              buttonHref="#"
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


