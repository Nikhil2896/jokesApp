import React from 'react';
import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';

const ModalLoading = props => {
  return (
    <Modal visible={props.visible} transparent={true}>
      <View style={styles.modal}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    </Modal>
  );
};

export default ModalLoading;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
