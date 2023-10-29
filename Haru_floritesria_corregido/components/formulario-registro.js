import { useCallback } from "react";
import InputDefaultNoIcon from "./input-default-no-icon";
import { useRouter } from "next/router";

const FormularioRegistro = () => {
  const router = useRouter();

  const onIniciaSesionClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <form className="relative w-[598px] h-[441px] overflow-hidden shrink-0">
      <b className="absolute top-[0px] left-[140.5px] text-17xl tracking-[-0.3px] leading-[26px] uppercase flex font-inter text-palevioletred text-center items-center w-[317px] h-[58px]">
        <span className="[line-break:anywhere] w-full">
          <p className="m-0">Registrate</p>
        </span>
      </b>
      <InputDefaultNoIcon
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="29px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="unset"
        inputDefaultNoIconBorder="none"
        inputDefaultNoIconFontFamily="Montserrat"
        inputDefaultNoIconFontSize="12px"
        inputDefaultNoIconBackgroundColor="transparent"
      />
      <InputDefaultNoIcon
        inputLabel="Apellido"
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="93px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="8px"
        inputDefaultNoIconBorder="unset"
        inputDefaultNoIconFontFamily="unset"
        inputDefaultNoIconFontSize="unset"
        inputDefaultNoIconBackgroundColor="unset"
        inputLabelDisplay="inline-block"
      />
      <InputDefaultNoIcon
        inputLabel="Correo electronico "
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="157px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="8px"
        inputDefaultNoIconBorder="unset"
        inputDefaultNoIconFontFamily="unset"
        inputDefaultNoIconFontSize="unset"
        inputDefaultNoIconBackgroundColor="unset"
        inputLabelDisplay="inline-block"
      />
      <InputDefaultNoIcon
        inputLabel="Numero"
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="221px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="8px"
        inputDefaultNoIconBorder="unset"
        inputDefaultNoIconFontFamily="unset"
        inputDefaultNoIconFontSize="unset"
        inputDefaultNoIconBackgroundColor="unset"
        inputLabelDisplay="inline-block"
      />
      <InputDefaultNoIcon
        inputLabel="Contraseña"
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="285px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="8px"
        inputDefaultNoIconBorder="unset"
        inputDefaultNoIconFontFamily="unset"
        inputDefaultNoIconFontSize="unset"
        inputDefaultNoIconBackgroundColor="unset"
        inputLabelDisplay="inline-block"
      />
      <b className="absolute top-[363px] left-[49px] text-mini tracking-[-0.3px] leading-[15px] uppercase font-inter text-palevioletred text-center">
        ¿ya tienes cuenta?
      </b>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[363px] left-[210px] text-mini tracking-[-0.3px] leading-[15px] uppercase font-bold font-inter text-gray text-center inline-block"
        onClick={onIniciaSesionClick}
      >
        inicia sesion
      </button>
      <button className="cursor-pointer [border:none] py-3 px-6 bg-palevioletred absolute top-[393px] left-[165px] rounded-md w-[268px] flex flex-row items-center justify-center box-border">
        <div className="relative text-base leading-[24px] font-semibold font-caption-regular text-gray text-left">
          ¡Únete!
        </div>
      </button>
    </form>
  );
};

export default FormularioRegistro;
