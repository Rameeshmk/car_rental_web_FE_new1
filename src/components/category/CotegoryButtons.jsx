const CategoryButtons = ({ onSelectCategory }) => {
    const categories = ['All', 'Sedan', 'Hatchback', 'SUV'];
  
    return (
      <div className='flex gap-10 p-4 w-max mx-80'>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="px-6 py-2 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700"
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default CategoryButtons;
  