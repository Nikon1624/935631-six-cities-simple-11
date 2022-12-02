import React, { useEffect, useRef } from 'react';
import { useActiveItem } from '../../hooks/use-active-item';
import { OptionSelectorType } from '../../types/option-selector-types';

type OptionSelectorProps = {
  options: OptionSelectorType[];
  onChange: (id: number) => void;
};

const OptionSelector: React.FC<OptionSelectorProps> = ({ options, onChange }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isOpened, setIsOpened] = useActiveItem<boolean>(false);
  const activeOption = options.find((option) => option.isActive) ?? options[0];

  useEffect(() => {
    const handleOutClick = (evt: MouseEvent) => {
      if (formRef.current) {
        if (evt.target instanceof HTMLElement && !formRef.current?.contains(evt.target)) {
          setIsOpened(false);
        }
      }
    };

    document.addEventListener('click', handleOutClick);
    return () => document.removeEventListener('click', handleOutClick);
  }, [setIsOpened]);

  const handleChangeSelectorOpenness = () => {
    setIsOpened(!isOpened);
  };

  const handleChangeActiveOption = (id: number) => {
    onChange(id);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" ref={formRef}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleChangeSelectorOpenness}>
        { activeOption.title }
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}
      >
        { options.map((option) => (
          <li
            className={`places__option ${option.isActive ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={option.id}
            onClick={() => handleChangeActiveOption(option.id)}
          >
            { option.title }
          </li>
        )) }
      </ul>
    </form>
  );
};

export default React.memo(OptionSelector);
