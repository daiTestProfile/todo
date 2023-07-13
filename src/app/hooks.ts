import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatchType, RootState} from 'app/store';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
