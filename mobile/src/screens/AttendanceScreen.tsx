import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AttendanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mark Attendance</Text>
      <View style={styles.cameraPlaceholder}>
        <Text>Camera View</Text>
      </View>
      <Button title="Capture Face" onPress={() => console.log('Capture')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  cameraPlaceholder: { width: '100%', aspectRatio: 4/3, backgroundColor: '#eee', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }
});

export default AttendanceScreen;
