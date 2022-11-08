import { useCallback, useState } from 'react';

export const useActiveOnMouseEvents = <T>(initialValue: T | null): [T | null, (newValue: T) => void, () => void] => {
  const [active, setActive] = useState<T | null>(initialValue);

  const onMouseEnter = useCallback((activeItem: T) => {
    setActive(activeItem);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActive(null);
  }, []);

  return [active, onMouseEnter, onMouseLeave];
};
