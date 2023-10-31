const FormContainer1 = () => {
  return (
    <div className="absolute top-[256px] left-[49px] w-[500px] h-[248px] flex flex-col items-start justify-start gap-[4px] text-left text-xs text-gray font-buttons-large-semibold">
      <div className="self-stretch relative leading-[20px]">Input Label</div>
      <textarea
        className="bg-pink h-auto self-stretch flex-1 rounded box-border border-[1px] border-solid border-grey-400"
        placeholder="Describa su pedido lo mas detallado posible"
        rows={15}
      />
    </div>
  );
};

export default FormContainer1;
