import React from 'react'
import {Modal, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {moderateScale} from "utils/Normalize";
import CloseIcon from "../assets/close.svg"

export const ConfirmModal = ({open, onPressClose, onPressConfirm, modalText,modalSutText, cancelText, confirmText}) => {
  if(!open){
    return null
  }

  return (
      <Modal
        transparent={true}
        visible={open}
        onRequestClose={onPressClose}
      >
        <View style={styles.centered_view}>
          <View style={styles.modal_view}>

            <TouchableOpacity onPress={onPressClose} style={styles.close_button}>
              <CloseIcon/>
            </TouchableOpacity>

            <View style={styles.modal_content}>
              <Text style={styles.modalText}>{modalText}</Text>
              <Text style={styles.modalSubText}>{modalSutText}</Text>
            </View>

            <View style={styles.buttons_container}>
              <TouchableOpacity style={[styles.button_container, styles.right_border]} onPress={onPressConfirm}>
                <Text style={styles.confirm_button}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_container} onPress={onPressClose}>
                <Text style={styles.cancel_button}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

  )
}

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modal_view: {
    width: "75%",
    backgroundColor: "white",
    borderRadius: 15,
    paddingTop: 24,
    alignItems: "center",
  },
  close_button: {
    position: "absolute",
    right: 12,
    top:12,
  },
  modal_content: {
    paddingHorizontal: 32,
  },
  buttons_container: {
    height: 45,
    alignSelf: 'stretch',
    flexDirection:'row',
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: '#BFBFBF',
  },
  button_container: {
    justifyContent: "center",
    flex:1,
    alignItems: "center",
  },
  right_border: {
    borderRightWidth: 1,
    borderRightColor: '#BFBFBF',
  },
  cancel_button: {
    alignItems: "center",
    fontFamily: 'Inter-Bold',
    fontSize: moderateScale(16),
    color: "black",
  },
  confirm_button: {
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    color: "black",
  },
  modalText: {
    fontFamily: 'Inter-Bold',
    fontSize: moderateScale(18),
    color: "black",
    marginBottom: 8,
    textAlign: "center"
  },
  modalSubText: {
    fontSize: moderateScale(13),
    color: '#999999',
    marginBottom: 16,
    textAlign: "center",
  },
});
