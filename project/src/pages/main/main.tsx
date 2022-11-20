import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';
import { useAppDispatch } from '../../hooks/index';
import { useActiveItem } from '../../hooks/use-active-item';
import { ApartamentList } from '../../components/apartament-list/apartament-list';
import { Map } from '../../components/map/map';
import { OptionSelector } from '../../components/option-selector/option-selector';
import { PointType } from '../../types/city-types';
import { changeActiveCity } from '../../store/actions';
import { OptionSelectorType } from '../../types/option-selector-types';

const initialSelectOptions: OptionSelectorType[] = [
  {
    id: 1,
    title: 'Popular',
    isActive: true,
  },
  {
    id: 2,
    title: 'Price: low to high',
    isActive: false,
  },
  {
    id: 3,
    title: 'Price: high to low',
    isActive: false,
  },
  {
    id: 4,
    title: 'Top rated first',
    isActive: false,
  },
];

export const Main: React.FC = () => {
  const city = useAppSelector((state) => state.activeCity);
  const apartamentList = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const [selectOptions, changeSelectOptions] = useActiveItem<OptionSelectorType[]>(initialSelectOptions);
  const [activePoint, changeActivePoint] = useActiveItem<PointType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    dispatch(changeActiveCity({ id }));
  }, [id, dispatch]);

  const onMouseEnter = useCallback((point: PointType) => {
    changeActivePoint(point);
  }, [changeActivePoint]);

  const onMouseLeave = useCallback(() => {
    changeActivePoint(null);
  }, [changeActivePoint]);

  const onChangeActiveSelectorOption = useCallback((optionId: number) => {
    const newSelectOptions = selectOptions.map((option) => option.id === optionId ? { ...option, isActive: !option.isActive } : { ...option, isActive: false });
    changeSelectOptions(newSelectOptions);
  }, [changeSelectOptions, selectOptions]);

  const placePoints = apartamentList.map((appartament) => appartament.coordinates);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{ apartamentList.length } places to stay in { city.title }</b>
          <OptionSelector options={selectOptions} onChange={onChangeActiveSelectorOption} />
          <ApartamentList apartamentList={apartamentList} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={city} points={placePoints} selectedPoint={activePoint} />
          </section>
        </div>
      </div>
    </div>
  );
};
