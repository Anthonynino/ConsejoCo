function HeaderModules({ title, description, onActionBtn, titleBtn }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-base-content">{title}</h2>
        <p className="text-sm text-base-content/60 mt-0.5">{description}</p>
      </div>
      {titleBtn && (
      <button
      className="btn btn-neutral btn-sm md:btn-md"
      onClick={onActionBtn}
      >
      <span className="text-lg">+</span> {titleBtn}
    </button>
    )}
    </div>
  );
}

export default HeaderModules;
