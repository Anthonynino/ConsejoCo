function CustomSelect({options, className}) {
  return (
    <div className={`w-full ${className}`}>
      <select className="select select-sm focus:select-primary w-full">
        {options.map((opt) => (
        <option>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
