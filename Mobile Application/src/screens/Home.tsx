import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {signOut} from '../services/auth';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const treatments = {
  Anthracnose: {
    reason:
      'Mango anthracnose is caused by the fungus Colletotrichum gloeosporioides var. minor, also known as Glomerella cingulata var. minor in its perfect stage. Spore production by this fungus is favored by wet or humid weather, with rain and wind particularly aiding in spore dispersal.',
    treatment:
      "Copper sprays recommended for controlling mango scab also control anthracnose with a one-day withholding period. Post-harvest treatments, like Prochloraz as a cold non-recirculating spray, are available for mango fruit. Maintaining healthy plants through proper cultural practices, such as adequate watering, avoiding overcrowding, and removing infected parts, is important. In some cases, fungicides may be necessary to control the disease's spread.",
  },
  'Bacterial Canker': {
    reason:
      'The bacterium enters leaves through stomata and fruit and twigs through lenticels, surviving in infected tree parts and leaves for up to 8 months. It spreads via rain, cuttings, and insects. The disease is more prevalent in areas with over 850 mm of annual precipitation, relative humidity above 80%, and temperatures between 24 and 32°C.',
    treatment:
      'Two sprays of streptocycline 200-300ppm at 20-day intervals reduce fruit infection. Dipping the fruits in 200ppm solution of agrimycin-100 is effective.',
  },
  'Cutting Weevil': {
    reason:
      'The mango leaf-cutting weevil is a serious pest of mango. Adult weevils after emergence feed on the epidermis of young leaves.',
    treatment:
      'Pesticide application is recommended when young leaves are 3 cm wide. Two or three weekly applications of insecticides like deltamethrin and fenvalerate can protect young shoots from weevil attacks. Additionally, mango leaf bagging with mosquito nets or polythene bags is recommended.',
  },
  'Die Back': {
    reason:
      'Dieback is usually caused by a combination of factors, such as disease and pathogens, insect attack, and/or stressful climate conditions.',
    treatment:
      'Traditional horticultural practices have been applied to confront the fungal attack. In general, avoidance of wounding of trees can limit disease incidence. Infected parts should be pruned from 7–10 cm below the infection site, removed, and burnt. Avoid pruning mango trees when the canopy is wet or during rainfall.',
  },
  'Gall Midge': {
    reason:
      'The Mango Leaf Gall Midge (MLGM) larvae induce abnormal growths known as galls on mango leaves by laying eggs individually under the surface of tender young leaves. Within days, the eggs hatch inside the leaf, leading to the formation of hollow galls around the emerging larva, marking the beginning of the MLGM lifecycle.',
    treatment:
      'Use yellow sticky traps to catch the flies. Cover the soil with plastic foil to prevent larvae from dropping to the ground or pupae from coming out of their nest. Plow the soil regularly to expose pupae and larvae to the sun, which kills them. Collect and burn infested tree material during the season.',
  },
  'Powdery Mildew': {
    reason:
      'Powdery mildew is caused by many specialized races of fungal species in the genera Erysiphe, Microsphaera, Phyllactinia, Podosphaera, Sphaerotheca, and Uncinula.',
    treatment:
      'Combine one tablespoon of baking soda and one-half teaspoon of liquid, non-detergent soap with one gallon of water, and spray the mixture liberally on the plants. Three sprays of fungicides are recommended. The first spray comprising of wettable sulfur (0.2%, i.e., 2g per liter of water) should be done when the panicles are 8-10 cm in size as a preventive spray.',
  },
  'Sooty Mould': {
    reason:
      'Mango sooty mold (Meliola mangiferae) is one of the species of fungi that grow on honeydew resulting from interactions among sap-feeding insects such as soft scale (wax, green, and cottony cushion scales), mealybugs, aphids, whiteflies, and treehoppers and non-parasitic fungi.',
    treatment:
      'Wipe the leaves with a damp, soft cloth or sponge dipped in lukewarm water. Spray the leaves with water from a hosepipe to dislodge the sooty mold. Control the sap-sucking insects producing the honeydew using a contact insecticide.',
  },
  Healthy: {
    reason: 'This is a healthy leaf.',
    treatment: 'No treatment necessary.',
  },
};

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const user = auth().currentUser;
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigation.navigate('SignIn');
  };

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      setLoading(true);
      const response = await axios.post(
        'https://run.mocky.io/v3/a6602d88-0bc7-47c0-b6f8-f03306094f54',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      const {prediction} = response.data;
      setPrediction(prediction);
    } catch (error) {
      Alert.alert('Error uploading image', error.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImageUri(null);
    setPrediction(null);
  };

  const getTreatment = prediction => {
    return (
      treatments[prediction] || {
        reason: 'Cannot recognize the image.',
        treatment: 'Please consult a specialist.',
      }
    );
  };

  const {reason, treatment} = prediction ? getTreatment(prediction) : {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        source={require('../image/mangoGreen.png')}
        style={styles.imageBg}
      />
      <View style={styles.container}>
        {user ? (
          <View style={styles.topContainer}>
            <Text style={styles.welcome}>Welcome, {user.email}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {!prediction && (
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.9,
                gap: 16,
                justifyContent: 'center',
              }}>
              <Button title="Select Image" onPress={selectImage} />
              <Button
                title="About Diseases"
                onPress={() => {
                  navigation.navigate('AboutDiseases');
                }}
              />
            </View>
          )}
          {imageUri && (
            <>
              <View style={{width: 'width * 0.4', alignSelf: 'center'}}>
                {prediction && (
                  <Button
                    title="About Diseases"
                    onPress={() => {
                      navigation.navigate('AboutDiseases');
                    }}
                  />
                )}
              </View>
              <Image source={{uri: imageUri}} style={styles.image} />
              {prediction && (
                <Text style={styles.predictionTitle}>{prediction}</Text>
              )}
              {!prediction && (
                <Button
                  title="Upload Image"
                  onPress={uploadImage}
                  disabled={loading}
                />
              )}
              {loading && <ActivityIndicator size="large" color="#1e90ff" />}
            </>
          )}
          {prediction && (
            <>
              <Swiper style={styles.wrapper} showsButtons>
                <View style={styles.slide}>
                  <Text style={styles.title}>Reason</Text>
                  <Text style={styles.justifiedText}>{reason}</Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.title}>Treatment</Text>
                  <Text style={styles.justifiedText}>{treatment}</Text>
                </View>
              </Swiper>
              <View style={styles.checkAnother}>
                <Button title="Check Another" onPress={reset} />
              </View>
            </>
          )}
        </ScrollView>
      </View>
      <View style={styles.signout}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  welcome: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 10,
    padding: 8,
  },
  aboutDiseases: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 10,
    backgroundColor: '#f0f8',
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  predictionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  wrapper: {
    height: height / 2.5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
  signout: {
    paddingTop: height / 25,
    bottom: height / 25,
    width: width * 0.3,
    alignSelf: 'center',
  },
  imageBg: {
    width: width,
    height: height / 5,
  },
  checkAnother: {
    paddingTop: 16,
  },
  justifiedText: {
    fontSize: 16,
    textAlign: 'justify',
    width: '100%',
  },
});

export default Home;
