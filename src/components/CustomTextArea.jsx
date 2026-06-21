function CustomTextArea({ placeholder, className, label = "", error = "", ...props }) {
  return (
    <div className={`${className} form-control w-full`}>
      {label !== "" && (
        <label className="label py-1">
          <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
            {label}
          </span>
        </label>
      )}
      <textarea
        className="textarea textarea-bordered h-24 bg-base-200/20 focus:textarea-primary w-full block"
        placeholder={placeholder}
        {...props}
      ></textarea>
      {error && (
        <label className="label py-1">
          <span className="label-text-alt text-error text-xs">{error}</span>
        </label>
      )}
    </div>
  );
}

export default CustomTextArea;