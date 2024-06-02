const Navbar = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container py-3 px-6 md:px-40 shadow-lg h-16 fixed">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold cursor-pointer">
            Word<span className="text-3xl text-green-700">TO</span>PDF
          </h1>
          <h1 className="text-2xl mt-1 hover:scale-125 duration-300 font-bold cursor-pointer">
            Home
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
