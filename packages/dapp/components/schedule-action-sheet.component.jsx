import { Actionsheet, HStack, Box, Text, Button, FlatList } from 'native-base';

const ScheduleActionSheet = ({ isOpen, onClose, schedule, setSchedule, onSetSchedule }) => {
  const Divider = () => <Box w="100%" h={0.5} bg="muted.200" />;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const scheduleOptions = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
  ];

  const renderDayItem = (item) => (
    <Actionsheet.Item
      alignItems="center"
      onPress={() => setSchedule({ occurrence: schedule.occurrence, day: item })}
    >
      {item}
    </Actionsheet.Item>
  );

  const renderScheduleOptions = () => (
    <HStack space={4} my={4}>
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
        {renderScheduleOptions()}
        <Box maxH={130} w="90%">
          {schedule.occurrence === 'Daily' ? (
            <Text textAlign="center">
              Your contribution will start today and repeat everyday after that.
            </Text>
          ) : (
            <FlatList
              data={days}
              keyExtractor={(item, index) => item + index}
              ItemSeparatorComponent={Divider}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderDayItem(item)}
            />
          )}
        </Box>

        <Box w="60%" px={4} m={6}>
          <Button
            rounded="3xl"
            onPress={() => {
              onSetSchedule();
              onClose();
            }}
          >
            Set
          </Button>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ScheduleActionSheet;
