import { useMemo } from "react";

const Header = ({
  headerAlignSelf,
  headerWidth,
  onHomeClick,
  onCotizacionesClick,
  onFrameButtonClick,
}) => {
  const headerStyle = useMemo(() => {
    return {
      alignSelf: headerAlignSelf,
      width: headerWidth,
    };
  }, [headerAlignSelf, headerWidth]);

  return (
    <div
      className="overflow-hidden flex flex-row items-center justify-center py-0 px-[15px] box-border gap-[150px] text-left text-lgi text-palevioletred font-inter self-stretch"
      style={headerStyle}
    >
      <div className="self-stretch flex-1 flex flex-row items-center justify-center">
        <div className="relative leading-[29px] uppercase font-medium">{`HARU `}</div>
      </div>
      <div className="flex flex-row items-start justify-start py-[35px] px-0 gap-[71px]">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-mini tracking-[-0.3px] leading-[26px] uppercase font-medium font-inter text-palevioletred text-left inline-block"
          onClick={onHomeClick}
        >
          home
        </button>
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-mini tracking-[-0.3px] leading-[26px] uppercase font-medium font-inter text-palevioletred text-left inline-block">
          sERVICIOS
        </button>
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-mini tracking-[-0.3px] leading-[26px] uppercase font-medium font-inter text-palevioletred text-left inline-block">
          fotos
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-mini tracking-[-0.3px] leading-[26px] uppercase font-medium font-inter text-palevioletred text-left inline-block"
          onClick={onCotizacionesClick}
        >
          Cotizaciones
        </button>
        <select className="flex flex-row items-start justify-center gap-[10px]">
          <option value="0">CATEGORIAS</option>
          <option value="1">OPCION 1</option>
          <option value="2">OPCION 2</option>
          <option value="3">OPCION 3</option>
        </select>
      </div>
      <div className="self-stretch flex-1 flex flex-col items-center justify-center">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] w-[150px] flex flex-row items-center justify-start"
          onClick={onFrameButtonClick}
        >
          <div className="relative text-lgi leading-[25px] uppercase font-medium font-inter text-palevioletred text-left flex items-center w-[124px] h-12 shrink-0">
            Inicio de sesion
          </div>
          <img
            className="relative w-[27px] h-[27px]"
            alt=""
            src="/group-1.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
