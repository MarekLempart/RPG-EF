import React, { useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions()
  const [msg, setMsg] = React.useState<string | null>(null)

  if (!permission) {
    <View />
  }

  if (!permission?.granted) {
    return (<SafeAreaView>
        <View>
          <Text>
            We need your permission to show the camera
          </Text>
          <Button title="Grant permission" onPress={requestPermission} />
        </View>
      </SafeAreaView>
    )
  }

  return <View style={styles.container}>
      <View style={styles.flexContainer}>
        <CameraView style={styles.flexContainer} ref={cameraRef} />
      </View>

      <View style={styles.flexContainer}>
        <Button title="Take picture" onPress={async () => {
          const photo = await cameraRef.current?.takePictureAsync()
          setMsg(`Zdjęcie zrobione w wymiarach: ${photo?.width}x${photo?.height}`)
        }} />
        <Text style={{ color: 'white' }}>{msg}</Text>
      </View>
    </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  flexContainer: {
    flex: 1
  }
});