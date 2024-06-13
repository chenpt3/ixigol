import { useTranslation } from 'react-i18next';

interface ReturnProps {
    onReturn: () => void;
  }
  
function Return({ onReturn }: ReturnProps) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-center align-center p-8 md:order-2 order-3 col-span-2 w-[200px] place-self-center">
        <button onClick={onReturn} className="font-bold px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-full">{t('Return')}</button>
        </div>
    );
}

export default Return;