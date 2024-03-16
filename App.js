import { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Header from './src/components/Header';
import Timer from './src/components/Timer';

import { LogBox } from 'react-native';
import Footer from './src/components/Footer';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const conlors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {

  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("Pomodoro" | "Short Break" | "Long Break");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    }else{
      clearInterval(interval);
    }

    if(time <= 0){
      resetTime();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop(){
    playSound();
    setIsActive(!isActive);
  }

  function resetTime(){
    setIsActive(false);
    setTime(currentTime === 0 ? 1500 : currentTime === 1 ? 300 : 900);
  }
  
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: conlors[currentTime]}]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          setTime={setTime}
          isActive={isActive}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime} 
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{color: "white", fontWeight: "bold"}}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={resetTime}>
          <Text style={{color: "white", fontWeight: "bold"}}>
            RESET
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },  
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
  buttonReset: {
    alignItems: 'center',
    backgroundColor: '#DE4C2D',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
