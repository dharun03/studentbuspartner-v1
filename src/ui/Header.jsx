function Header({ image, title }) {
  return (
    <div className="col-span-1 my-8 ml-4 flex items-center gap-4">
      <img src={`images/${image}`} alt="" className="size-12  object-cover" />

      <div>
        <h3 className=" text-2xl/tight font-medium text-gray-900">{title}</h3>
      </div>
    </div>
  );
}

export default Header;
