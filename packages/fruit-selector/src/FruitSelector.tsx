import React, { useState, ChangeEvent, FocusEvent, FC } from 'react';

// Define fruit type
interface Fruit {
  name: string;
  image: string;
}

const suggestions: Fruit[] = [
  {
    name: 'Apple',
    image: 'https://via.placeholder.com/20/FF0000/FFFFFF?text=A',
  },
  {
    name: 'Banana',
    image: 'https://via.placeholder.com/20/FFFF00/000000?text=B',
  },
  {
    name: 'Orange',
    image: 'https://via.placeholder.com/20/FFA500/FFFFFF?text=O',
  },
  {
    name: 'Mango',
    image: 'https://via.placeholder.com/20/FFD700/000000?text=M',
  },
  {
    name: 'Grapes',
    image: 'https://via.placeholder.com/20/800080/FFFFFF?text=G',
  },
  {
    name: 'Pineapple',
    image: 'https://via.placeholder.com/20/DAA520/000000?text=P',
  },
];

const FruitSelector: FC = () => {
  const [input, setInput] = useState<string>('');
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [focused, setFocused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInput(value);
    setShowDropdown(value.length > 0);
    setSelectedFruit(null);
  };

  const handleFocus = (): void => {
    setFocused(true);
    if (input.length > 0) setShowDropdown(true);
  };

  const handleBlur = (): void => {
    setFocused(false);
    setShowDropdown(false);
    setHoveredIndex(null);
  };

  const handleSelect = (fruit: Fruit): void => {
    setInput(fruit.name);
    setSelectedFruit(fruit);
    setShowDropdown(false);
  };

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter((f) =>
    f.name.toLowerCase().includes(input.toLowerCase())
  );

  // Limit to the first 2 results
  const limitedSuggestions = filteredSuggestions.slice(0, 2);

  const isActive = focused || input.length > 0 || selectedFruit !== null;
  const borderColor = focused || showDropdown ? '#1976d2' : '#ccc';

  return (
    <div
      style={{ position: 'relative', width: 300, fontFamily: 'sans-serif' }}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      {/* Input container */}
      <div
        style={{
          position: 'relative',
          border: `1px solid ${borderColor}`,
          borderBottom: showDropdown ? 'none' : `1px solid ${borderColor}`, // Hide bottom border when dropdown is visible
          borderRadius: `4px 4px ${showDropdown ? '0' : '4px'} ${
            showDropdown ? '0' : '4px'
          }`, // Remove bottom radius when dropdown is visible
          padding: '20px 12px 6px 12px',
          boxSizing: 'border-box',
          backgroundColor: '#fff',
        }}
      >
        <label
          style={{
            position: 'absolute',
            top: isActive ? 6 : '50%',
            left: 12,
            fontSize: isActive ? 12 : 16,
            color: isActive ? '#1976d2' : '#aaa',
            transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
            transition: 'all 0.2s ease',
            backgroundColor: '#fff',
            padding: '0 4px',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          Select fruit
        </label>

        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder=""
          style={{
            width: '100%',
            fontSize: 16,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            marginTop: isActive ? 8 : 0,
            paddingLeft: selectedFruit ? '32px' : '12px', // Adjust padding for image space
          }}
        />
        {selectedFruit && (
          <img
            src={selectedFruit.image}
            alt={selectedFruit.name}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 20,
              height: 20,
              verticalAlign: 'middle',
            }}
          />
        )}
      </div>

      {showDropdown && limitedSuggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            backgroundColor: 'white',
            border: `1px solid ${borderColor}`,
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            maxHeight: 150,
            overflowY: 'auto',
            boxSizing: 'border-box',
            zIndex: 1,
          }}
        >
          {limitedSuggestions.map((fruit, index) => (
            <li
              key={fruit.name}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur before selection
                handleSelect(fruit);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                cursor: 'pointer',
                backgroundColor: hoveredIndex === index ? '#f0f0f0' : 'white',
              }}
            >
              <img
                src={fruit.image}
                alt={fruit.name}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              {fruit.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FruitSelector;
