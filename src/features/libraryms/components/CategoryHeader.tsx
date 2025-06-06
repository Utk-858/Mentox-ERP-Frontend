const HeaderCategories = [
  "Fictional",
  "Non Fictional",
  "Science and Tech",
  "Academic"
];

const CategoryHeader: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto rounded-lg flex justify-center gap-4 lg:gap-8 px-4">
      {HeaderCategories.map((category) => (
        <button
          key={category}
          type="button"
          className="bg-gray-100 text-sm lg:text-lg text-black px-6 py-2 lg:py-3 xl:px-12 rounded-lg hover:bg-gray-200 transition-colors duration-300"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryHeader;
