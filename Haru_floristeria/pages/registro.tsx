import type { NextPage } from "next";
import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Icon } from "@mui/material";
import { Select } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import DivqodefHeaderWrapper from "../components/divqodef-header-wrapper";
import Footer from "../components/footer";

const Registro: NextPage = () => {
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

  const onIniciaSesionClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="relative [background:linear-gradient(180deg,_#e1569d,_rgba(243,_174,_213,_0.74)_99.99%,_rgba(253,_241,_241,_0.61))] w-full overflow-hidden flex flex-col items-center justify-start gap-[152px]">
      <DivqodefHeaderWrapper
        divqodefHeaderWrapperAlignSelf="unset"
        divqodefHeaderWrapperWidth="1440px"
        onHomeClick={onHomeClick}
        onCotizacionesClick={onCotizacionesClick}
        onFrameButtonClick={onFrameButtonClick}
      />
      <div className="rounded-31xl bg-mediumvioletred-200 overflow-hidden flex flex-col items-start justify-start py-[38px] px-0">
        <form className="relative w-[598px] h-[441px] overflow-hidden shrink-0">
          <b className="absolute top-[0px] left-[140.5px] text-17xl tracking-[-0.3px] leading-[26px] uppercase flex font-inter text-palevioletred text-center items-center w-[317px] h-[58px]">
            <span className="[line-break:anywhere] w-full">
              <p className="m-0">Registrate</p>
            </span>
          </b>
          <input
            className="[border:none] font-caption-regular text-xs bg-[transparent] absolute top-[29px] left-[49px] w-[500px] flex flex-col items-start justify-start"
            type="text"
          />
          <div className="absolute top-[93px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">
              Apellido
            </div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="text" />
            </Form>
          </div>
          <div className="absolute top-[157px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">{`Correo electronico `}</div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="email" placeholder="correo@email.com" />
            </Form>
          </div>
          <div className="absolute top-[221px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">
              Numero
            </div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="tel" />
            </Form>
          </div>
          <div className="absolute top-[285px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">
              Contraseña
            </div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="password" />
            </Form>
          </div>
          <b className="absolute top-[363px] left-[49px] text-mini tracking-[-0.3px] leading-[15px] uppercase font-inter text-palevioletred text-center">
            ¿ya tienes cuenta?
          </b>
          <Link
            className="cursor-pointer [text-decoration:none] absolute top-[363px] left-[210px] text-mini tracking-[-0.3px] leading-[15px] uppercase font-bold font-inter text-gray text-center"
            href="/login"
            onClick={onIniciaSesionClick}
          >
            inicia sesion
          </Link>
          <Button
            className="absolute top-[393px] left-[165px]"
            sx={{ width: 268 }}
            color="primary"
            variant="contained"
          >
            ¡Únete!
          </Button>
        </form>
      </div>
      <Footer
        divqodefPageFooterTopAreaPosition="unset"
        divqodefPageFooterTopAreaTop="unset"
        divqodefPageFooterTopAreaLeft="unset"
        divqodefPageFooterTopAreaAlignSelf="unset"
      />
    </div>
  );
};

export default Registro;
