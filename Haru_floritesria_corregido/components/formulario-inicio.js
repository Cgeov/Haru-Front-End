import { useCallback } from "react";
import FormContainer from "./form-container";
import { useRouter } from "next/router";

const FormularioInicio = () => {
  const router = useRouter();

  const onCreaUnaClick = useCallback(() => {
    router.push("/registro");
  }, [router]);

  return (
    <div className="relative w-[598px] h-[523px] overflow-hidden shrink-0 text-center text-17xl text-palevioletred font-inter">
      <div className="absolute top-[26px] left-[125px] w-[348px] h-[58px] overflow-hidden">
        <b className="absolute top-[0px] left-[31px] tracking-[-0.3px] leading-[26px] uppercase flex items-center justify-center w-[317px] h-[58px]">
          inicia sesion
        </b>
      </div>
      <div className="absolute top-[373px] left-[149px] w-[300px] h-12 overflow-hidden">
        <FormContainer ctaButtonText="ingresa" propTop="0px" propLeft="32px" />
      </div>
      <div className="absolute top-[140px] left-[33px] w-[532px] h-32 overflow-hidden text-left text-xs text-gray font-buttons-large-semibold">
        <div className="absolute top-[0px] left-[32px] w-[500px] h-32 overflow-hidden">
          <div className="absolute top-[0px] left-[0px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative leading-[20px]">{`Correo electronico `}</div>
            <input
              className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
              type="text"
            />
          </div>
          <div className="absolute top-[64px] left-[0px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch relative leading-[20px]">
              Contraseña
            </div>
            <input
              className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
              type="password"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[313px] left-[65px] w-[468px] h-[15px] overflow-hidden text-mini">
        <div className="absolute top-[0px] left-[0px] w-[242px] h-[15px] overflow-hidden">
          <b className="absolute top-[0px] left-[0px] tracking-[-0.3px] leading-[15px] uppercase">
            ¿no tienes cuenta?
          </b>
          <button
            className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0px] left-[165px] text-mini tracking-[-0.3px] leading-[15px] uppercase font-bold font-inter text-gray text-center inline-block"
            onClick={onCreaUnaClick}
          >
            crea una
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioInicio;
