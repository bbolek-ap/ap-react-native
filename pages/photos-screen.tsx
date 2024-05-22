import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

export default function PhotosScreen() {
  const [photos, setPhotos] = useState([]);

  const takePhoto = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const source = {uri: response.assets[0].uri};
        setPhotos([...photos, source]);
      }
    });
  };

  const pickPhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then(images => {
      const pickedPhotos = images.map(image => ({uri: image.path}));
      setPhotos([...photos, ...pickedPhotos]);
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Gallery</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickPhoto}>
          <Text style={styles.buttonText}>Pick Photo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#6200ea',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  grid: {
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
