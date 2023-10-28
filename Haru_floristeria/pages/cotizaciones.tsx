import type { NextPage } from "next";
import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Icon } from "@mui/material";
import { Select, Textarea } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import DivqodefHeaderWrapper from "../components/divqodef-header-wrapper";
import Footer from "../components/footer";

const Cotizaciones: NextPage = () => {
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
      <DivqodefHeaderWrapper
        divqodefHeaderWrapperAlignSelf="unset"
        divqodefHeaderWrapperWidth="1440px"
        onHomeClick={onHomeClick}
        onCotizacionesClick={onCotizacionesClick}
        onFrameButtonClick={onFrameButtonClick}
      />
      <div className="rounded-31xl bg-mediumvioletred-200 h-[747px] overflow-hidden shrink-0 flex flex-col items-start justify-start py-[38px] px-0 box-border">
        <form className="relative w-[598px] h-[663px] overflow-hidden shrink-0">
          <b className="absolute top-[0px] left-[140.5px] text-17xl tracking-[-0.3px] leading-[26px] uppercase flex font-inter text-palevioletred text-center items-center w-[317px] h-[58px]">
            <span className="[line-break:anywhere] w-full">
              <p className="m-0">cotizacion</p>
            </span>
          </b>
          <div className="absolute top-[128px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">{`Correo electronico `}</div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="email" placeholder="correo@email.com" />
            </Form>
          </div>
          <div className="absolute top-[64px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">
              Nombre completo
            </div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="text" />
            </Form>
          </div>
          <div className="absolute top-[192px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">
              Numero
            </div>
            <Form className="[border:none] bg-[transparent] self-stretch">
              <Form.Control type="tel" />
            </Form>
          </div>
          <div className="absolute top-[256px] left-[49px] w-[500px] h-[248px] flex flex-col items-start justify-start gap-[4px]">
            <div className="self-stretch relative text-xs leading-[20px] font-caption-regular text-gray text-left">
              Input Label
            </div>
            <Textarea
              className="self-stretch flex-1"
              variant="outline"
              isRequired
              textColor="#48091a"
              backgroundColor="#fbd0d5"
              focusBorderColor="#48091a"
            />
          </div>
          <Button
            className="absolute top-[555px] left-[165px]"
            sx={{ width: 268 }}
            color="primary"
            variant="contained"
          >
            ¡Cotiza!
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

export default Cotizaciones;
