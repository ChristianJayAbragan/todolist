import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TodoListWithAddIcon = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const addTask = () => {
    if (taskText.trim() !== '') {
      const updatedTasks = [...tasks, { text: taskText, id: Date.now() }];
      setTasks(updatedTasks);
      setTaskText('');
      setShowInput(false);
    }
  };

  const editTask = (taskId) => {
    setSelectedTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskText(taskToEdit.text);
      setShowInput(true);
    }
  };

  const updateTask = () => {
    if (taskText.trim() !== '') {
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTaskId ? { ...task, text: taskText } : task
      );
      setTasks(updatedTasks);
      setTaskText('');
      setShowInput(false);
      setSelectedTaskId(null);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setShowInput(false);
    setSelectedTaskId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskBox}>
        {selectedTaskId === item.id ? (
          <TextInput
            style={styles.input}
            value={taskText}
            onChangeText={(text) => setTaskText(text)}
          />
        ) : (
          <Text style={styles.taskText}>{item.text}</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        {selectedTaskId === item.id ? (
          <TouchableOpacity onPress={updateTask} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => editTask(item.id)} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const goBack = () => {
    setShowInput(false);
    setTaskText('');
    setSelectedTaskId(null);
  };

  return (
    <View style={styles.container}>
      {!showInput ? (
        <>
          <Text style={styles.infoText}>
            Click the add icon to add a task
          </Text>
          <TouchableOpacity
            onPress={() => setShowInput(true)}
            style={styles.addButtonContainer}
          >
            <AntDesign name="plus" size={30} color="#183D3D" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a task"
            value={taskText}
            onChangeText={(text) => setTaskText(text)}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
      />

      {showInput && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040D12',
  },
  infoText: {
    color: 'white',
    marginBottom: 20,
  },
  addButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#93B1A6',
  },
  inputContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: '-35%',
    transform: [{ translateX: -160 }, { translateY: -30 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#93B1A6',
    borderWidth: 1,
    marginLeft: 10,
    padding: 10,
    color: '#000',
    borderRadius: 5,
  },
  addButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#183D3D',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '86%',
  },
  taskBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  taskText: {
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    backgroundColor: '#183D3D',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    bottom:0,
    padding: 20,
    backgroundColor: '#183D3D',
    borderRadius: 5,
    width: '100%',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    
  },
  deleteText: {
    color: 'red',
    backgroundColor: 'pink',
    borderRadius: 20,
    padding: 10,
  },
});

export default TodoListWithAddIcon;
