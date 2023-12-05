import { HStack, Text, Pressable, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const ScheduleComponent = ({ title, schedule, onPress, isLast }) => {
  return (
    <HStack bg="white" p={4} justifyContent="space-between" roundedBottom={isLast ? '2xl' : null}>
      <Text fontSize="md">{title}</Text>
      <Pressable onPress={onPress}>
        <HStack space={2}>
          <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.800" />
          <Text color="primary.800" fontWeight="semibold">
            {schedule.occurrence}{' '}
            {schedule.occurrence === 'Daily' ? '' : `on ${schedule.day.slice(0, 3)}`}
          </Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default ScheduleComponent;
