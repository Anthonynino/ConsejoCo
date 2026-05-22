function CustomInput({
  placeholder,
  className,
  icon,
  label = "",
  type = "text",
  ...props
}) {
  const Icon = icon;
  return (
    <div className={`${className} form-control w-full`}>
      {label !== "" && (
        <label className="label py-1">
          <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
            {label}
          </span>
        </label>
      )}
      <div className={`relative w-full`}>
        {icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3 w-3" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`${icon ? "pl-9" : ""} input input-bordered input-sm w-full focus:input-primary bg-base-200/20`}
          {...props}
        />
      </div>
    </div>
  );
}

export default CustomInput;
