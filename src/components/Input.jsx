export default function Input({
  label,
  placeholder,
  value="",
  onChange,
  type = "text",
  children
}){
  // TODO : false event 
  return(
    <form className="flex flex-col gap-2 w-full z-10">
      <label className="text-[15px] font-semibold text-black">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full h-[48px]
          px-4
          rounded-xl
          border border-blue-400
          text-[15px]
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-300
          shadow-xl
          "
      />
      {/* 버튼 스타일 받는 */}
      {children}
    </form>
  );
}