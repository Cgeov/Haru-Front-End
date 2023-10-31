import { useCallback } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import FormularioCotizacion from "../components/formulario-cotizacion";
import Footer from "../components/footer";

const Cotizaciones = () => {
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

  return (
    <div className="relative [background:linear-gradient(180deg,_#e1569d,_rgba(243,_174,_213,_0.74)_99.99%,_rgba(253,_241,_241,_0.61))] w-full overflow-hidden flex flex-col items-center justify-start gap-[37px]">
      <Header
        headerAlignSelf="unset"
        headerWidth="1440px"
        onHomeClick={onHomeClick}
        onCotizacionesClick={onCotizacionesClick}
        onFrameButtonClick={onFrameButtonClick}
      />
      <div className="rounded-31xl bg-mediumvioletred-200 h-[747px] overflow-hidden shrink-0 flex flex-col items-start justify-start py-[38px] px-0 box-border">
        <FormularioCotizacion />
      </div>
      <Footer
        footerWidth="1440px"
        footerAlignSelf="unset"
        instagramIconHeight="51.67%"
        instagramIconBottom="24.17%"
      />
    </div>
  );
};

export default Cotizaciones;
