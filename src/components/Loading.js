import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

export function Loading({loading}) {
  console.log("Fds");
  if (!loading) {
    return <View />;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator color={'red'} />
        <Text style={styles.text}>Loadingdsadddddddddddddddddddd...dsd</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 8,
    
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '500',
  }
});
