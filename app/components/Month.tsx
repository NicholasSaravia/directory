export const Month = () => {
  return (
    <section className="bg-white border-2 border-green-800 border-dashed relative px-4 pt-4 pb-6 rounded-lg w-full sm:w-10/12 mx-auto min-h-[100px]">
      <h2 className="font-bold text-2xl text-center mb-4">January</h2>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {Array.from({ length: 2 }).map((_, i) => {
          return i % 2 === 0 ? (
            <div className="bg-white text-center px-4 py-1 bg-opacity-85 shadow-sm border rounded-full">
              🥳 Greg Smith · 1/22
            </div>
          ) : (
            <div className="bg-white text-center px-4 py-1 bg-opacity-85 shadow-sm border rounded-full">
              ❤️ &nbsp;Joe & Jill Shmo · 1/15
            </div>
          );
        })}
      </div>
    </section>
  );
};
