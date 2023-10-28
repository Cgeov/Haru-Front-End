import type { NextPage } from "next";
import { useMemo, type CSSProperties, useCallback } from "react";
import { Button, Icon } from "@mui/material";
import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";

type DivqodefHeaderWrapperType = {
  /** Style props */
  divqodefHeaderWrapperAlignSelf?: CSSProperties["alignSelf"];
  divqodefHeaderWrapperWidth?: CSSProperties["width"];

  /** Action props */
  onHomeClick?: () => void;
  onCotizacionesClick?: () => void;
  onFrameButtonClick?: () => void;
};

const DivqodefHeaderWrapper: NextPage<DivqodefHeaderWrapperType> = ({
  divqodefHeaderWrapperAlignSelf,
  divqodefHeaderWrapperWidth,
}) => {
  const divqodefHeaderWrapperStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: divqodefHeaderWrapperAlignSelf,
      width: divqodefHeaderWrapperWidth,
    };
  }, [divqodefHeaderWrapperAlignSelf, divqodefHeaderWrapperWidth]);

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
    <div
      className="overflow-hidden flex flex-row items-center justify-center py-0 px-[15px] box-border gap-[150px] text-left text-lgi text-palevioletred font-inter self-stretch"
      style={divqodefHeaderWrapperStyle}
    >
      <div className="self-stretch flex-1 flex flex-row items-center justify-center">
        <div className="relative leading-[29px] uppercase font-medium">{`HARU `}</div>
      </div>
      <div className="flex flex-row items-start justify-start py-[35px] px-0 gap-[71px]">
        <Button
          className="relative cursor-pointer"
          color="primary"
          variant="text"
          onClick={onHomeClick}
        >
          home
        </Button>
        <Button className="relative" color="primary" variant="text">
          sERVICIOS
        </Button>
        <Button className="relative" color="primary" variant="text">
          fotos
        </Button>
        <Button
          className="relative cursor-pointer"
          color="primary"
          variant="text"
          onClick={onCotizacionesClick}
        >
          Cotizaciones
        </Button>
        <Select
          size="sm"
          textColor="#932150"
          backgroundColor="rgba(247, 210, 233, 0)"
          borderColor="#4b0c26"
        >
          <option value="opcion1">opcion1</option>
          <option value="opcion2">opcion2</option>
          <option value="opcion3">opcion3</option>
        </Select>
      </div>
      <div className="self-stretch flex-1 flex flex-col items-center justify-center">
        <Button
          className="cursor-pointer"
          sx={{ width: 150 }}
          color="primary"
          size="medium"
          variant="text"
          endIcon={<Icon>arrow_forward_ios_sharp</Icon>}
          onClick={onFrameButtonClick}
        >
          Inicio de sesion
        </Button>
      </div>
    </div>
  );
};

export default DivqodefHeaderWrapper;
