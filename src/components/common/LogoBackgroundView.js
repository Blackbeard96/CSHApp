import React from 'react';
import {View, Image} from 'react-native';

const LogoBackgroundView = ({style, children}) => (
  <View style={[styles.container, style]}>
        <Image
          source={require('../imgs/CSHLogo.png')}
          style={styles.bkg}
        />
        {children}
  </View>
);

const styles = {
  bkg:{
    // flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.2,
    resizeMode: 'contain'

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // width: '100%',
    backgroundColor: '#F5FCFF',
  }
};
export {LogoBackgroundView};
