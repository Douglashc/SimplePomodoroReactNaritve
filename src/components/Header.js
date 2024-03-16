import { View, Text, TouchableOpacity, StyleSheet } from "react-native"; 

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime, isActive }) {
    
    function handlePress(index){
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }
    
    return (
        <View style={{ flexDirection: 'row' }}>
            {options.map((item, index) => (
                <TouchableOpacity
                    key={index} style={[styles.itemStyle, currentTime !== index && {borderColor: 'transparent'}]}
                    onPress={() => handlePress(index)}
                    disabled={isActive ? true : false}
                >
                    <Text style={{ fontWeight: 'bold' }}>{ item }</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '33%',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#F2F2F2',
        borderRadius: 10,
        padding: 5,
        marginVertical: 20,
    }
})

