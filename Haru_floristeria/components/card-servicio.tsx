import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import { Button } from "@mui/material";

type CardServicioType = {
  /** Style props */
  cardServicioFlexShrink?: CSSProperties["flexShrink"];
};

const CardServicio: NextPage<CardServicioType> = ({
  cardServicioFlexShrink,
}) => {
  const cardServicioStyle: CSSProperties = useMemo(() => {
    return {
      flexShrink: cardServicioFlexShrink,
    };
  }, [cardServicioFlexShrink]);

  return (
    <div
      className="w-[647px] h-[635px] flex flex-row items-start justify-start p-8 box-border gap-[32px] text-left text-29xl text-palevioletred font-caption-regular"
      style={cardServicioStyle}
    >
      <div className="flex-1 h-[500px] flex flex-col items-start justify-center py-0 pr-8 pl-0 box-border gap-[24px]">
        <div className="self-stretch flex flex-row items-start justify-center">
          <div className="flex-1 relative leading-[56px] font-medium">
            Bodas
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start p-2 text-base text-gray">
          <div className="flex-1 relative leading-[28px]">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            bibendum varius dictumst consectetur non ullamcorper massa. Bibendum
            libero urna semper ornare.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vitae bibendum varius dictumst consectetur non
            ullamcorper massa. Bibendum libero urna semper ornare.
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-center">
          <Button color="secondary" variant="contained">
            Button
          </Button>
        </div>
      </div>
      <div className="flex-1 relative bg-primary-100 h-[500px] text-grey-900">
        <div className="absolute top-[calc(50%_-_28px)] left-[calc(50%_-_48.75px)] leading-[56px] font-semibold">
          IMG
        </div>
      </div>
    </div>
  );
};

export default CardServicio;
