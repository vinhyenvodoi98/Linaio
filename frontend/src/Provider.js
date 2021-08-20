import { AppThemeProvider } from 'contexts/Theme';
import { TaquitoProvider } from 'contexts/Taquito';
import { BackGroundProvider } from 'components/Themes/themes';
import { MessageProvider } from 'contexts/Message';

const Providers = ({ children }) => {
  return (
    <TaquitoProvider>
      <AppThemeProvider>
        <BackGroundProvider>
          <MessageProvider>{children}</MessageProvider>
        </BackGroundProvider>
      </AppThemeProvider>
    </TaquitoProvider>
  );
};

export default Providers;
