import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const NotificationModal = ({ modalVisible, onClose, body, title }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View
        style={{
          width: width * 0.9,
          height: height,
          alignSelf: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={[
            styles.modalView,
            { minHeight: 200, justifyContent: "space-evenly" },
          ]}
        >
          {/* //NotificationModal */}

          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              New Notification
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {/* <Text style={styles.modalHeader}>Title</Text> */}
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={styles.modalText}>{title} </Text>
            {/* <Text style={styles.modalHeader}>Body</Text> */}
            <Text style={styles.modalText}>{body}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: 0,
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose()}
            >
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1 / 9,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 200,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    width: "50%",
    padding: 0,
    margin: 0,
  },
  modalHeader: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
