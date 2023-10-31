import { useCallback } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import FormularioInicio from "../components/formulario-inicio";
import Footer from "../components/footer";

const Login = () => {
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
    <div className="relative [background:linear-gradient(180deg,_#e1569d,_rgba(243,_174,_213,_0.74)_99.99%,_rgba(253,_241,_241,_0.61))] w-full h-[1024px] overflow-hidden flex flex-col items-center justify-start gap-[110px]">
      <Header
        headerAlignSelf="unset"
        headerWidth="1440px"
        onHomeClick={onHomeClick}
        onCotizacionesClick={onCotizacionesClick}
        onFrameButtonClick={onFrameButtonClick}
      />
      <div className="rounded-31xl bg-mediumvioletred-200 overflow-hidden flex flex-col items-center justify-start py-[38px] px-1">
        <FormularioInicio />
      </div>
      <Footer
        footerWidth="1440px"
        footerAlignSelf="unset"
        instagramIconHeight="52.08%"
        instagramIconBottom="23.75%"
      />
    </div>
  );
};

export default Login;
