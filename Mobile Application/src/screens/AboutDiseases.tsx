import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const diseaseData = [
  {
    name: 'Anthracnose',
    image: require('../image/diseases/Anthracnose/Anthracnose.jpg'),
  },
  {
    name: 'Bacterial Canker',
    image: require('../image/diseases/BacterialCanker/BacterialCanker.jpg'),
  },
  {
    name: 'Cutting Weevil',
    image: require('../image/diseases/CuttingWeevil/CuttingWeevil.jpg'),
  },
  {name: 'Die Back', image: require('../image/diseases/DieBack/DieBack.jpg')},
  {
    name: 'Gall Midge',
    image: require('../image/diseases/GallMidge/GallMidge.jpg'),
  },
  {
    name: 'Powdery Mildew',
    image: require('../image/diseases/PowderyMildew/PowderyMildew.jpg'),
  },
  {
    name: 'Sooty Mould',
    image: require('../image/diseases/SootyMould/SootyMould.jpg'),
  },
];

const AboutDiseases = () => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diseases</Text>
      </View>
      <FlatList
        data={diseaseData}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#d0e7ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 16,
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: width,
    paddingVertical: 16,
  },
});

export default AboutDiseases;
