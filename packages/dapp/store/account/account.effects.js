import { setUserDetails } from './account.slice';
import { useSendCodeMutation } from '../../services/africastalking';

export const accountListeners = (startListening) => {
  startListening({
    actionCreator: setUserDetails,
    effect: async (action, listenerApi) => {
      const { ctryCode, phoneNo } = action.payload;
      console.log(ctryCode + phoneNo);
      //sendVerification(ctryCode, phoneNo);
    },
  });
};

function sendVerification(ctryCode, phoneNo) {
  const [sendCode, { isLoading, isError, data }] = useSendCodeMutation();
  let formData = new FormData();
  formData.append('to', ctryCode + phoneNo);
  formData.append('message', 'your verification code is #123456');
  formData.append('from', 'Clixpesa');
  formData.append('username', 'sandbox');
  sendCode(formData);
}
