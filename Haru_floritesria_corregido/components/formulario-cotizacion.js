import FormContainer1 from "./form-container1";
import FormContainer from "./form-container";

const FormularioCotizacion = () => {
  return (
    <form className="relative w-[598px] h-[663px] overflow-hidden shrink-0">
      <b className="absolute top-[0px] left-[140.5px] text-17xl tracking-[-0.3px] leading-[26px] uppercase flex font-inter text-palevioletred text-center items-center w-[317px] h-[58px]">
        <span className="[line-break:anywhere] w-full">
          <p className="m-0">cotizacion</p>
        </span>
      </b>
      <div className="absolute top-[128px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">{`Correo electronico `}</div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="email"
        />
      </div>
      <div className="absolute top-[64px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">
          Nombre completo
        </div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="text"
        />
      </div>
      <div className="absolute top-[192px] left-[49px] w-[500px] flex flex-col items-start justify-start gap-[8px]">
        <div className="self-stretch relative text-xs leading-[20px] font-buttons-large-semibold text-gray text-left">
          Numero
        </div>
        <input
          className="bg-pink self-stretch rounded box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400"
          type="text"
        />
      </div>
      <FormContainer1 />
      <FormContainer ctaButtonText="¡Cotiza!" />
    </form>
  );
};

export default FormularioCotizacion;
