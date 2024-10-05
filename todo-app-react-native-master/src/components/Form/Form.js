import React, { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableHighlight, View } from 'react-native';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';

const Form = ({ setTaskList }) => {
  const [taskDesc, setTaskDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // To enable/disable 'Add Task' button

  // Enable button only if taskDesc is not empty
  const handleDescChange = (text) => {
    setTaskDesc(text);
    setIsButtonEnabled(text.trim() !== ''); // Enable button only if input is not empty
  };

  const handleAddPress = () => {
    if (taskDesc) {
      setIsLoading(true);

      const todo = {
        description: taskDesc,
        done: false, // Default status
      };

      setTaskList((prevTaskList) => {
        const newTaskId = Date.now().toString(); // Unique ID using timestamp
        return {
          ...prevTaskList,
          [newTaskId]: todo,
        };
      });

      setTaskDesc('');
      setErrorMessage(null);
      setIsLoading(false);
      setIsButtonEnabled(false); // Disable button after task is added
      Keyboard.dismiss();
    } else {
      setIsLoading(false);
      setErrorMessage('Task description cannot be empty!');
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        maxLength={150}
        onChangeText={handleDescChange}
        value={taskDesc}
      />
      <TouchableHighlight
        style={[styles.addBtn, { opacity: isButtonEnabled ? 1 : 0.6 }]}
        onPress={handleAddPress}
        disabled={!isButtonEnabled} // Disable if no title is entered
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addBtnText}>Add</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};

export default Form;
