function CustomSelect({ options, className, label = "", ...props }) {
  return (
    <div className={`${className} form-control w-full`}>
      {label !== "" && (
        <label className="label py-1">
          <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
            {label}
          </span>
        </label>
      )}
      <div className={`w-full`}>
        <select
          className="select select-bordered select-sm focus:select-primary w-full"
          {...props}
        >
          {options.map((opt, idx) => {
            const isObject = typeof opt === "object";
            const val = isObject ? opt.value : opt;
            const lbl = isObject ? opt.label : opt;
            return (
              <option key={idx} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default CustomSelect;
