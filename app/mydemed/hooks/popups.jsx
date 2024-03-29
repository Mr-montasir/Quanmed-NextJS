import { useState } from 'react';
import {
  SignUpPopup, 
  SignInPopup, 
  PasswordResetPopup, 
  DeleteNotePopup,
  DeactivateAccount,
  ApprovedPopup,
  SubscibePopup,
  SuccessMessage,
  ErrorMessage,
  DashboardOptions,
  VerificationPopup,
  VerificationCode
} from '../components/popups/popups_components';

export function usePopupFunctions() {
  const [activePopup, setActivePopup] = useState(null);
  const [activeText, setActiveText] = useState(null);
  const [activeTitle, setActiveTitle] = useState(null);
  const [activeDescription, setActiveDescription] = useState(null);

  const closePopups = () => {
    setActivePopup(null);
    setActiveText(null);
    setActiveTitle(null);
    setActiveDescription(null);
  };

  const openPopup = (popup) => {
    closePopups();
    setActivePopup(popup);
  };

  const openSuccessPopup = (text) => {
    closePopups();
    setActivePopup('SuccessPopup');
    setActiveText(text);
  };

  const openErrorPopup = (title, description) => {
    closePopups();
    setActivePopup('ErrorPopup');
    setActiveTitle(title);
    setActiveDescription(description);
  };

  const renderPopup = () => {
    switch (activePopup) {
      case 'SignUp':
        return <SignUpPopup onClose={closePopups} onSwitchPopup={(switchTo)=> { openPopup(switchTo) }} />;
      case 'SignIn':
        return <SignInPopup onClose={closePopups} onSwitchPopup={(switchTo)=> { openPopup(switchTo) }} />;
      case 'PasswordReset':
        return <PasswordResetPopup onClose={closePopups} />;
      case 'DeleteNote':
        return <DeleteNotePopup onClose={closePopups} />;
      case 'DeactivateAccount':
        return <DeactivateAccount onClose={closePopups} />;
      case 'Approved':
        return <ApprovedPopup onClose={closePopups} />;
      case 'Subscribe':
        return <SubscibePopup onClose={closePopups} />;
      case 'DashboardOptions':
        return <DashboardOptions onClose={closePopups}  onSwitchPopup={(switchTo)=> { openPopup(switchTo) }} />
      case 'VerificationPopup':
        return <VerificationPopup onClose={closePopups} />;
      case 'VerificationCode':
        return <VerificationCode onClose={closePopups} />;

      /*------< Messages >------*/
      case 'SuccessMessage':
        return <SuccessMessage text="Welcome to my DeMed" onClose={closePopups}  />
      case 'WelcomeBack':
        return <SuccessMessage text="Welcome back, Username" onClose={closePopups}  />
      case 'LoginFailed':
        return <ErrorMessage title="Login Failed" description="Your login is incorrect " onClose={closePopups}  />
      case 'ErrorMessage':
        return <ErrorMessage title="Error" description="Connection severed" onClose={closePopups}  />
      case 'SuccessPopup':
        return <SuccessMessage text= {activeText} onClose={closePopups}  />
      case 'ErrorPopup':
        return <ErrorMessage title={activeTitle} description={activeDescription} onClose={closePopups}  />
      default:
        return null;
    }
  };

  return {
    activePopup,
    openPopup,
    closePopups,
    renderPopup,
    openSuccessPopup,
    openErrorPopup
  };
}
