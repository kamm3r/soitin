import React, { useState } from 'react';

interface SelectProps {
  title: string;
  items: ItemsProps[];
}

interface ItemsProps {
  id: number;
  value: string;
}

export default function Select({ title, items = [] }: SelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<ItemsProps[]>([]);
  const toggle = () => setOpen(!open);
  const handleOnClick = (item: ItemsProps) => {
    if (!selection.some((current) => current.id === item.id)) {
      setSelection([item]);
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval.filter((current) => current.id !== item.id);
      setSelection([...selectionAfterRemoval]);
    }
  };
  function isItemInSelection(item: ItemsProps) {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='flex min-h-[38px] flex-wrap text-black'>
      <div
        tabIndex={0}
        className='flex justify-between cursor-pointer w-full px-5 py-2 bg-white border border-slate-300 rounded shadow-sm'
        role='button'
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        <p className='font-bold'>
          {selection[0] ? selection[0]?.value : title}
        </p>
        <p>{open ? 'Close' : 'Open'}</p>
      </div>
      {open && (
        <ul className='w-full mt-5 shadow-sm'>
          {items.map((item) => (
            <li
              className='first-of-type:border-t first-of-type:border-slate-300 first-of-type:rounded-t last-of-type:rounded-b'
              key={item.id}
            >
              <button
                className='flex justify-between bg-white py-2 px-5 border-b border-x border-slate-300 w-full text-left hover:cursor-pointer hover:bg-slate-300'
                onClick={() => handleOnClick(item)}
              >
                <span>{item.value}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
