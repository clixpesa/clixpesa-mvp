import React, { useEffect, useState } from 'react';
import { HStack, Pressable, Spacer, Text } from 'native-base';

const ResendTimer = ({ seconds, onResend }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <HStack>
      <Text bg="primary.100" color="primary.600" fontWeight="medium" px={3} py={1} borderRadius={8}>
        New OTP will be sent in {timeLeft}s
      </Text>
      <Spacer />
      <Pressable
        disabled={timeLeft > 0}
        onPress={() => {
          setTimeLeft(55), onResend;
        }}
      >
        <Text
          bg={timeLeft ? 'primary.100' : 'primary.600'}
          color={timeLeft ? 'primary.500' : 'primary.100'}
          fontWeight="medium"
          p={2}
          pt={1}
          borderRadius={8}
        >
          Send another
        </Text>
      </Pressable>
    </HStack>
  );
};

export default ResendTimer;
