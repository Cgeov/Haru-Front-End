import react from "react";

export default function AboutUsHome() {
  return (
    <div>
      <h1 className="font-bold text-center mb-50 text-2xl text-primary">
        Acerca de nosotros
      </h1>
      <div className="flex justify-center flex-wrap gap-10 mt-[30px]">
        <div className="flex-col bg-[#ffced3] py-4 px-10 w-[375px] rounded-lg">
          <h3 className="text-2xl text-primary">Ubicacion</h3>
        </div>
        <div className="flex-col bg-[#ffced3] py-4 px-10 w-[375px] rounded-lg">
          <h3 className="text-2xl text-primary">Ubicacion</h3>
        </div>
        <div className="flex-col bg-[#ffced3] py-4 px-10 w-[375px] rounded-lg">
          <h3 className="text-2xl text-primary">Ubicacion</h3>
        </div>
      </div>
    </div>
  );
}
