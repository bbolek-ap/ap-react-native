import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateProject} from '../services/project-service.ts';
import {Project} from './project-list-item.tsx';
import Toast from 'react-native-toast-message';

const ProjectForm: React.FC = ({route}: any) => {
  const {project} = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      ...project,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Project) => updateProject(data),
    onSuccess: (_, variables) => {
      Toast.show({
        type: 'success',
        text1: 'Project saved successfully!',
      });
      queryClient.setQueryData(['Project', project.id], {
        ...variables,
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });

  const onSubmit = (data: any) => {
    // Handle save logic here, for example, send data to server or update state
    updateMutation.mutate(data);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Project Name"
            placeholderTextColor="#bbb"
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>This field is required.</Text>}

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Project Description"
            placeholderTextColor="#bbb"
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.error}>This field is required.</Text>
      )}

      <Text style={styles.label}>Start Date</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#bbb"
          />
        )}
        name="startDate"
      />
      {errors.startDate && (
        <Text style={styles.error}>This field is required.</Text>
      )}

      <Text style={styles.label}>End Date</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#bbb"
          />
        )}
        name="endDate"
      />
      {errors.endDate && (
        <Text style={styles.error}>This field is required.</Text>
      )}

      <Button title="Save" onPress={handleSubmit(onSubmit)} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#f0edf6',
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#f0edf6',
    backgroundColor: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProjectForm;
