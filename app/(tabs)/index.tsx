import { SafeAreaView, Platform, StatusBar } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNotification } from '@/context/NotificationContext';

export default function HomeScreen() {
  const { expoPushToken, notification, error } = useNotification();

  if (error) {
    return (
      <ThemedView>
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  console.log(JSON.stringify(notification, null, 2));
  console.log('expoPushToken', expoPushToken);

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="subtitle" style={{ color: "red" }}>
          Your push token:
        </ThemedText>
        <ThemedText>{expoPushToken}</ThemedText>
        <ThemedText type="subtitle">Latest notification:</ThemedText>
        <ThemedText>{notification?.request.content.title}</ThemedText>
        <ThemedText>
          {JSON.stringify(notification?.request.content.data, null, 2)}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
