import {fetchProjects} from '../services/project-service.ts';
import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProjectListItem from './project-list-item.tsx';
import LoadingSpinner from './loading-spinner.tsx';
import {useNavigation} from '@react-navigation/native';

const ProjectList = () => {
  const [filter, setFilter] = useState<string>('');
  const navigation = useNavigation();

  const {data: projects, isLoading} = useQuery({
    queryKey: ['ProjectList', filter],
    queryFn: () => fetchProjects(filter),
    staleTime: 10000,
    meta: {
      showNotification: true,
      operationName: 'Fetch Project List',
    },
  });

  if (isLoading) {
    return (
      <View style={styles.listContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Projects..."
          value={filter}
          onChangeText={val => setFilter(val)}
        />
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <TextInput
        style={styles.searchInput}
        placeholderTextColor="#0c0c0c"
        placeholder="Search Projects..."
        value={filter}
        onChangeText={val => setFilter(val)}
      />
      <FlatList
        data={projects}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProjectDetails', {projectId: item.id})
            }>
            <ProjectListItem project={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    color: '#074607',
    paddingHorizontal: 10,
  },
});

export default ProjectList;
