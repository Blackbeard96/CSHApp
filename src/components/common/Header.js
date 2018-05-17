import React from 'react';
import {Text, View} from 'react-native';


const Header = ({label, children}) => {
  const {textStyle, viewStyle} = styles;
    let val = label ?
    (<View style={viewStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>)
    :
    (<View style={viewStyle}>
      {children}
    </View>);
  return val;
};

const styles = {
  textStyle: {
    fontSize: 20
  },
  viewStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
};

export {Header};
