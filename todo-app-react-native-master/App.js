import { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, ActivityIndicator } from 'react-native';
import Header from './src/components/Header/Header';
import styles, { colourPalette } from './src/styles/main';
import Tasks from './src/components/Tasks/Tasks';
import AddTask from './src/components/AddTask/AddTask';

export default function App() {
  const [taskList, setTaskList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header />
      <AddTask setTaskList={setTaskList} />
      {!isLoading ? (
        <Tasks taskList={taskList} setTaskList={setTaskList} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} color={colourPalette.primary} size="large" />
          <Text style={{ marginTop: 10 }}>Loading tasks...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
