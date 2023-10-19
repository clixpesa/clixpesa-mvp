import { Actionsheet, HStack, Box, Text, Button, FlatList } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

const ScheduleActSheet = ({
  title,
  isOpen,
  onClose,
  isSetCtb,
  schedule,
  setSchedule,
  setCtbSchedule,
  setDisbSchedule,
}) => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dispatch = useDispatch();

  const renderDayItem = (item) => (
    <TouchableOpacity onPress={() => setSchedule({ day: item, occurrence: schedule.occurrence })}>
      <Text
        fontSize="xl"
        color="text.600"
        py={1}
        textAlign="center"
        borderBottomWidth={1}
        borderBottomColor="primary.200"
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const scheduleOptions = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
  ];

  const renderScheduleOptions = () => (
    <HStack space={3} m={3}>
      {scheduleOptions.map((option) => (
        <Button
          key={option.label}
          variant="subtle"
          rounded="3xl"
          w="25%"
          _text={{ color: 'text.600', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => setSchedule({ day: schedule.day, occurrence: option.value })}
        >
          {option.label}
        </Button>
      ))}
    </HStack>
  );

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box alignSelf="flex-start" ml={3}>
          <Text fontSize="md" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="md" color="muted.500">
            {schedule.occurrence} {schedule.day ? 'on' : ''} {schedule.day}
          </Text>
        </Box>
        {renderScheduleOptions()}
        <Box maxH={120} w="2/3" my={2}>
          {schedule.occurrence !== 'Daily' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={weekDays}
              renderItem={({ item }) => renderDayItem(item)}
            />
          ) : (
            <>
              <Text fontWeight="medium" textAlign="center">
                Its Gonna be Daily.
              </Text>
              <Text textAlign="center" color="primary.600">
                This frequency means that your first contribution will start Today and repeat
                everyday after that.
              </Text>
            </>
          )}
        </Box>
        <Button
          variant="subtle"
          rounded="3xl"
          bg="primary.600"
          _text={{ color: 'text.50', fontWeight: 'semibold', mb: '0.5' }}
          w="60%"
          my={3}
          onPress={() => {
            const scheduleSetter = isSetCtb ? setCtbSchedule : setDisbSchedule;
            dispatch(scheduleSetter(schedule));
          }}
          onPressOut={onClose}
        >
          Set
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ScheduleActSheet;
