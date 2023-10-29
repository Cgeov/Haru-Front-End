import { useMemo } from "react";

const PrimaryDefaultLargeNoIcon = ({
  primaryDefaultLargeNoIconBackgroundColor,
  primaryDefaultLargeNoIconBoxSizing,
  primaryDefaultLargeNoIconCursor,
  primaryDefaultLargeNoIconBorder,
  buttonTextColor,
  buttonTextDisplay,
}) => {
  const primaryDefaultLargeNoIconStyle = useMemo(() => {
    return {
      backgroundColor: primaryDefaultLargeNoIconBackgroundColor,
      boxSizing: primaryDefaultLargeNoIconBoxSizing,
      cursor: primaryDefaultLargeNoIconCursor,
      border: primaryDefaultLargeNoIconBorder,
    };
  }, [
    primaryDefaultLargeNoIconBackgroundColor,
    primaryDefaultLargeNoIconBoxSizing,
    primaryDefaultLargeNoIconCursor,
    primaryDefaultLargeNoIconBorder,
  ]);

  const buttonTextStyle = useMemo(() => {
    return {
      color: buttonTextColor,
      display: buttonTextDisplay,
    };
  }, [buttonTextColor, buttonTextDisplay]);

  return (
    <div
      className="rounded-md bg-primary-500 flex flex-row items-center justify-center py-3 px-6 text-left text-base text-background-white font-caption-regular"
      style={primaryDefaultLargeNoIconStyle}
    >
      <div
        className="relative leading-[24px] font-semibold"
        style={buttonTextStyle}
      >
        Button
      </div>
    </div>
  );
};

export default PrimaryDefaultLargeNoIcon;
