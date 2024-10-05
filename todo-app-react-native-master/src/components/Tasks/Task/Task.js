import React, { useState } from 'react';
import { Alert, Switch, Text, View } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';

const Task = ({ taskId, task, setTaskList }) => {
  const [taskStatus, setTaskStatus] = useState(task.done);

  // Update task status on switch toggle
  function handleStatusChange(value) {
    setTaskStatus(value);
    setTaskList((prevTaskList) => {
      return {
        ...prevTaskList,
        [taskId]: {
          ...prevTaskList[taskId],
          done: value
        },
      };
    });
  }

  // Delete task from the list
  function handleDeleteTask() {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => {
          setTaskList((prevTaskList) => {
            const updatedTaskList = { ...prevTaskList };
            delete updatedTaskList[taskId];
            return updatedTaskList;
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <Text style={styles.desc}>{task.description}</Text>
        <Text style={task.done ? styles.completed : styles.open}>
          Status: {task.done ? 'Done' : 'Due'}
        </Text>
      </View>
      <View style={{ flexDirection: 'row',gap:'10', alignItems: 'flex-end' }}>
        <Switch value={taskStatus} onValueChange={handleStatusChange} />
        <Entypo name="trash" size={29} color="black" onPress={handleDeleteTask} />
      </View>
    </View>
  );
};

export default Task;
