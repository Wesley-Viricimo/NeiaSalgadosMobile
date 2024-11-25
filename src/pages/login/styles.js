import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 10,
    },
    linkText: {
        color: '#3498db',
        fontSize: 14,
        alignSelf: 'center'
    },
    loginButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});