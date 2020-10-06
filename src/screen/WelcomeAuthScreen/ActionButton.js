import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../utils/color';
import {Button} from '../../components';

const ActionButton = ({desc, title, onPress}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text.desc}>{desc}</Text>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = {
  wrapper: {
    marginBottom: 20,
    minWidth: 250,
  },
  text: {
    desc: {
      fontSize: 10,
      color: colors.text.default,
      textAlign: 'center',
      marginBottom: 8,
      color: 'white',
    },
  },
};

export default ActionButton;
