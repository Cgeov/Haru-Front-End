import { useCallback } from "react";
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
      <div className="absolute top-[29px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">{`Nombre `}</div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="text"
        />
      </div>
      <div className="absolute top-[93px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">
          Apellido
        </div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="text"
        />
      </div>
      <div className="absolute top-[157px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">{`Correo electronico `}</div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          placeholder="correo@email.com"
          type="email"
        />
      </div>
      <div className="absolute top-[221px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">
          Numero
        </div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="tel"
        />
      </div>
      <div className="absolute top-[285px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">
          Contraseña
        </div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="password"
        />
      </div>
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
        <div className="relative text-base leading-[24px] font-semibold font-buttons-large-semibold text-gray text-left">
          ¡Únete!
        </div>
      </button>
    </form>
  );
};

export default FormularioRegistro;
