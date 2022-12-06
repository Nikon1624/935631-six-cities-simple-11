import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';
import { useAppDispatch } from '../../hooks/index';
import { useActiveItem } from '../../hooks/use-active-item';
import { ApartamentList } from '../../components/apartament-list/apartament-list';
import { Map } from '../../components/map/map';
import { MainEmpty } from '../main-empty/main-empty';
import OptionSelector from '../../components/option-selector/option-selector';
import { Loader } from '../../components/loader/loader';
import { City, Point } from '../../types/offer-types';
import { changeActiveCity } from '../../store/data-slice/data-slice';
import { OptionSelectorType } from '../../types/option-selector-types';
import { getCity, getOfferPoints, getOffers, getCityById, getLoadingStatus } from '../../store/data-slice/selectors';
import { NotFound } from '../not-found/not-found';


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
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(getLoadingStatus);
  const city = useAppSelector(getCity);
  const cityById = useAppSelector(getCityById(id));
  const offers = useAppSelector(getOffers);
  const offerPoints = useAppSelector(getOfferPoints);
  const [selectOptions, changeSelectOptions] = useActiveItem<OptionSelectorType[]>(initialSelectOptions);
  const [activePoint, changeActivePoint] = useActiveItem<Point | null>(null);

  useEffect(() => {
    if (cityById) {
      dispatch(changeActiveCity(cityById));
    }
  }, [cityById, dispatch]);

  const onMouseEnter = useCallback((point: Point) => {
    changeActivePoint(point);
  }, [changeActivePoint]);

  const onMouseLeave = useCallback(() => {
    changeActivePoint(null);
  }, [changeActivePoint]);

  const onChangeActiveSelectorOption = useCallback((optionId: number) => {
    const newSelectOptions = selectOptions.map((option) => option.id === optionId ? { ...option, isActive: !option.isActive } : { ...option, isActive: false });
    changeSelectOptions(newSelectOptions);
  }, [changeSelectOptions, selectOptions]);

  if (loadingStatus) {
    return <Loader />;
  }

  if (!offers || !offers.length) {
    return <MainEmpty />;
  }

  if (!cityById) {
    return <NotFound />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places" data-testid="places_wrapper">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{ offers.length } places to stay in { city && city.name }</b>
          <OptionSelector options={selectOptions} onChange={onChangeActiveSelectorOption} />
          <ApartamentList apartamentList={offers} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        </section>
        <div className="cities__right-section" data-testid="map_wrapper">
          <section className="cities__map map">
            <Map city={city as City} points={offerPoints} selectedPoint={activePoint} />
          </section>
        </div>
      </div>
    </div>
  );
};
