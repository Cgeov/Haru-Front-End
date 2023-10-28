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

const Login: NextPage = () => {
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

  const onCreaUnaClick = useCallback(() => {
    router.push("/registro");
  }, [router]);

  return (
    <div className="relative [background:linear-gradient(180deg,_#e1569d,_rgba(243,_174,_213,_0.74)_99.99%,_rgba(253,_241,_241,_0.61))] w-full h-[1024px] overflow-hidden flex flex-col items-center justify-start gap-[110px] text-center text-17xl text-palevioletred font-inter">
      <DivqodefHeaderWrapper
        divqodefHeaderWrapperAlignSelf="unset"
        divqodefHeaderWrapperWidth="1440px"
        onHomeClick={onHomeClick}
        onCotizacionesClick={onCotizacionesClick}
        onFrameButtonClick={onFrameButtonClick}
      />
      <div className="rounded-31xl bg-mediumvioletred-200 overflow-hidden flex flex-col items-center justify-start py-[38px] px-1">
        <div className="relative w-[598px] h-[523px] overflow-hidden shrink-0">
          <div className="absolute top-[26px] left-[125px] w-[348px] h-[58px] overflow-hidden">
            <b className="absolute top-[0px] left-[31px] tracking-[-0.3px] leading-[26px] uppercase flex items-center justify-center w-[317px] h-[58px]">
              inicia sesion
            </b>
          </div>
          <div className="absolute top-[373px] left-[149px] w-[300px] h-12 overflow-hidden">
            <Button
              className="absolute top-[0px] left-[32px]"
              sx={{ width: 268 }}
              color="primary"
              variant="contained"
            >
              ingresa
            </Button>
          </div>
          <div className="absolute top-[140px] left-[33px] w-[532px] h-32 overflow-hidden text-left text-xs text-gray font-caption-regular">
            <div className="absolute top-[0px] left-[32px] w-[500px] h-32 overflow-hidden">
              <div className="absolute top-[0px] left-[0px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
                <div className="self-stretch relative leading-[20px]">{`Correo electronico `}</div>
                <Form className="[border:none] bg-[transparent] self-stretch">
                  <Form.Control type="email" placeholder="correo@email.com" />
                </Form>
              </div>
              <div className="absolute top-[64px] left-[0px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
                <div className="self-stretch relative leading-[20px]">
                  Contraseña
                </div>
                <Form className="[border:none] bg-[transparent] self-stretch">
                  <Form.Control type="password" />
                </Form>
              </div>
            </div>
          </div>
          <div className="absolute top-[313px] left-[65px] w-[468px] h-[15px] overflow-hidden text-mini">
            <div className="absolute top-[0px] left-[0px] w-[242px] h-[15px] overflow-hidden">
              <b className="absolute top-[0px] left-[0px] tracking-[-0.3px] leading-[15px] uppercase">
                ¿no tienes cuenta?
              </b>
              <Link
                className="cursor-pointer [text-decoration:none] absolute top-[0px] left-[165px] tracking-[-0.3px] leading-[15px] uppercase font-bold text-gray"
                href="/cotizaciones"
                onClick={onCreaUnaClick}
              >
                crea una
              </Link>
            </div>
          </div>
        </div>
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

export default Login;
