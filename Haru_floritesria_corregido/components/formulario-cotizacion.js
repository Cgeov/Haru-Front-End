import InputDefaultNoIcon from "./input-default-no-icon";
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
      <InputDefaultNoIcon
        inputLabel="Correo electronico "
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="128px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="8px"
        inputDefaultNoIconBorder="unset"
        inputDefaultNoIconFontFamily="unset"
        inputDefaultNoIconFontSize="unset"
        inputDefaultNoIconBackgroundColor="unset"
        inputLabelDisplay="inline-block"
      />
      <InputDefaultNoIcon
        inputLabel="Nombre completo"
        inputDefaultNoIconWidth="500px"
        inputDefaultNoIconPosition="absolute"
        inputDefaultNoIconTop="64px"
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
        inputDefaultNoIconTop="192px"
        inputDefaultNoIconLeft="49px"
        inputDefaultNoIconGap="8px"
        inputDefaultNoIconBorder="unset"
        inputDefaultNoIconFontFamily="unset"
        inputDefaultNoIconFontSize="unset"
        inputDefaultNoIconBackgroundColor="unset"
        inputLabelDisplay="inline-block"
      />
      <FormContainer1 />
      <FormContainer ctaButtonText="¡Cotiza!" />
    </form>
  );
};

export default FormularioCotizacion;
