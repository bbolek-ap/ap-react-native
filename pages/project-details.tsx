import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchProject} from '../services/project-service.ts';
import LoadingSpinner from './loading-spinner.tsx';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

const ProjectDetails: React.FC = ({route}: any) => {
  const {projectId} = route.params;
  const navigation = useNavigation();
  const {data: project} = useQuery({
    queryKey: ['Project', projectId],
    queryFn: () => fetchProject(projectId as string),
    staleTime: 50000,
    meta: {
      showNotification: true,
      operationName: `Fetch Project Details ${projectId}`,
    },
  });

  if (!project) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      <Text style={styles.description}>{project.description}</Text>
      <View style={styles.datesContainer}>
        <Text style={styles.date}>
          Start: {dayjs(project.startDate).format('MMMM D, YYYY')}
        </Text>
        <Text style={styles.date}>
          End: {dayjs(project.endDate).format('MMMM D, YYYY')}
        </Text>
      </View>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('ProjectForm', {project})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2d2d2d', // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0edf6', // Light text color
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#f0edf6', // Light text color
    marginBottom: 20,
  },
  datesContainer: {
    marginTop: 10,
  },
  date: {
    fontSize: 14,
    color: '#929292', // Slightly darker text color for dates
  },
});

export default ProjectDetails;
