import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import CardServicio from "../components/card-servicio";
import Footer from "../components/footer";

const Inicio = () => {
  const router = useRouter();

  const onHomeClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onCotizacionesClick = useCallback(() => {
    router.push("/cotizaciones");
  }, [router]);

  const onFrameButtonClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className="relative [background:linear-gradient(180deg,_#eb7bb7_3.65%,_rgba(243,_174,_213,_0.74)_99.98%,_#fae9f3_99.99%)] w-full overflow-hidden flex flex-col items-center justify-start gap-[30px] text-left text-29xl text-palevioletred font-caption-regular">
      <Header
        headerAlignSelf="stretch"
        headerWidth="unset"
        onHomeClick={onHomeClick}
        onCotizacionesClick={onCotizacionesClick}
        onFrameButtonClick={onFrameButtonClick}
      />
      <div className="self-stretch relative h-[1053px] overflow-hidden shrink-0" />
      <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start py-[27px] px-[15px] gap-[50px]">
        <CardServicio cardServicioFlexShrink="0" />
        <CardServicio cardServicioFlexShrink="0" />
        <CardServicio cardServicioFlexShrink="0" />
        <CardServicio cardServicioFlexShrink="0" />
      </div>
      <div
        className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[61px] px-[53px] gap-[81px] [&.animate]:animate-[2s_ease_0s_1_normal_forwards_fade-in-top] opacity-[0]"
        data-animate-on-scroll
      >
        <div className="self-stretch overflow-hidden flex flex-col items-end justify-center">
          <div className="self-stretch relative leading-[56px] font-medium">
            Acerca de nosotros
          </div>
        </div>
        <div className="self-stretch rounded-31xl bg-mediumvioletred-100 overflow-hidden flex flex-row items-start justify-center py-0 px-2.5 gap-[100px] text-11xl text-gray lg:flex-col lg:items-center lg:justify-start">
          <div className="rounded-31xl bg-pink w-[375px] h-[600px] overflow-hidden shrink-0 flex flex-col items-center justify-start py-7 px-0 box-border">
            <div className="relative leading-[56px] font-medium">Ubicacion</div>
          </div>
          <div className="rounded-31xl bg-pink w-[375px] h-[600px] overflow-hidden shrink-0 flex flex-col items-end justify-start py-7 px-[165px] box-border">
            <div className="relative leading-[56px] font-medium">Objetivos</div>
          </div>
          <div className="rounded-31xl bg-pink w-[375px] h-[600px] overflow-hidden shrink-0 flex flex-col items-center justify-start py-7 px-0 box-border">
            <div className="relative leading-[56px] font-medium">Valores</div>
          </div>
        </div>
      </div>
      <Footer
        footerWidth="unset"
        footerAlignSelf="stretch"
        instagramIconHeight="51.67%"
        instagramIconBottom="24.17%"
      />
    </div>
  );
};

export default Inicio;
