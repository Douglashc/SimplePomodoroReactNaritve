import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
    return (
        <View style={styles.containerFooter}>
            <Text style={styles.textFooter}>&#169; 2024 Douglashc.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFooter: {
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        padding: 7
    },
    textFooter: {
        color: 'red'
    }
});