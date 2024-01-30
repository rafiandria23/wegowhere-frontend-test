import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../interfaces/redux.interface';
import store from '../redux';

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
