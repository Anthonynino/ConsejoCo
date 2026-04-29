function CustomInput({ placeholder, className, icon, type = "text" }) {
  const Icon = icon
  return (
    <div className={`relative w-full ${className}`}>
      {icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3 w-3" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${icon ? "pl-9" : "" } input input-bordered input-sm w-full focus:input-primary bg-base-200/20`}
      />
    </div>
  );
}

export default CustomInput;
