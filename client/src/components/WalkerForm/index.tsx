import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../AsyncStorage";
import { RouteStackParamList } from "../../NavigationConfig/types";
import { getOwner } from "../../redux/owner/actions";
import { getWalkers } from "../../redux/walker/actions";

interface State {
  name?: string;
  lastname?: string;
  description?: string;
  cellphone?: number;
  dni?: number;
  fee?: number;
  workZone?: string[];
  workHours?: string;
  zona?: string;
}

const WalkerForm = ({ navigation }: RouteStackParamList<"WalkerForm">) => {
  const [data, setData] = useState<State>();
  const [id, setId] = useState<string>("");

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.owner);

  const dataStore = async () => {
    const idData = await getData();
    setId(idData);
    dispatch(getOwner(idData));
  };

  useEffect(() => {
    dataStore();
  }, []);

  const handleSubmit = () => {
    axios.put(`/walkers/${id}`, data);
    navigation.navigate("Profile");
    dispatch(getOwner(id));
    return dispatch(getWalkers());
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>Name</Text>
        <TextInput
          defaultValue={user?.name}
          onChangeText={(value) => handleChange("name", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Lastname</Text>
        <TextInput
          defaultValue={user?.lastname}
          onChangeText={(value) => handleChange("lastname", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          defaultValue={user?.description || ""}
          onChangeText={(value) => handleChange("description", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text>Cellphone</Text>
        <TextInput
          defaultValue={String(user?.cellphone)}
          onChangeText={(value) => handleChange("cellphone", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
      </View>

      <View>
        <Text>DNI</Text>
        <TextInput
          defaultValue={String(user?.dni)}
          onChangeText={(value) => handleChange("dni", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text>City</Text>
        <TextInput
          defaultValue={user?.zona}
          onChangeText={(value) => handleChange("zona", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Fee</Text>
        <TextInput
          defaultValue={String(user?.fee) || ""}
          onChangeText={(value) => handleChange("fee", value)}
          style={styles.input}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text>Work Zone</Text>
        <TextInput
          defaultValue={String(user?.workZone)}
          onChangeText={(value) => {
            let result = value.toLowerCase().trim().split(", ");
            return setData({ ...data, workZone: result });
          }}
          style={styles.input}
          placeholder="E.g Caballito-Palermo "
          maxLength={50}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Work hours</Text>
        <TextInput
          defaultValue={String(user?.workHours) || ""}
          style={styles.input}
          onChangeText={(value) => handleChange("workHours", value)}
          maxLength={50}
          autoCapitalize="none"
          placeholder="E.g. : 14 to 18hs"
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WalkerForm;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#c98c70",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    height: 25,
    borderBottomColor: "#456672",
    borderBottomWidth: 2,
    marginBottom: 10,
    textTransform: "capitalize",
  },
});